use std::time::SystemTime;

use serenity::{
    client::Context, framework::standard::CommandError, framework::standard::CommandResult,
    model::channel::GuildChannel, model::channel::Message, model::id::ChannelId,
    model::id::GuildId, model::id::RoleId, model::id::UserId, model::prelude::User,
    prelude::Mentionable,
};
use sqlx::{pool::PoolConnection, query, Postgres, Transaction};

use crate::utils::{get_time_as_unix_epoch, DbPool};

pub(crate) async fn insert_message(
    message: &Message,
    guild_id: GuildId,
    mut con: Transaction<'_, Postgres>,
) -> CommandResult {
    let message_id = i64::from(message.id);
    let guild_id = i64::from(guild_id);
    let author_id = i64::from(message.author.id);
    let now = get_time_as_unix_epoch(SystemTime::now());
    if (!message.mention_roles.is_empty())
        || message.mentions.iter().any(|v| v.id != message.author.id)
    {
        query!(
            "INSERT INTO message_content (author_id,message_id, server_id, at_time, content) VALUES($1,$2,$3,$4,$5)",
            author_id,
            message_id,
            guild_id,
            now,
            message.content
        ).execute(&mut con).await?;
        for ping in message
            .mentions
            .iter()
            .filter(|v| v.id != message.author.id)
        {
            query!(
                "INSERT INTO pinged_users (user_id,message_id,server_id) VALUES ($1,$2,$3)",
                i64::from(ping.id),
                message_id,
                guild_id
            )
            .execute(&mut con)
            .await?;
        }
        for ping in &message.mention_roles {
            query!(
                "INSERT INTO pinged_roles (role_id,message_id,server_id) VALUES ($1,$2,$3)",
                (*ping.as_u64()) as i64,
                message_id,
                guild_id
            )
            .execute(&mut con)
            .await?;
        }
    }
    con.commit().await?;
    /*
    if message.
    */
    Ok(())
}

async fn get_guild_channel(
    ctx: &Context,
    channel_id: serenity::model::id::ChannelId,
) -> Option<GuildChannel> {
    match channel_id.to_channel_cached(&ctx).await {
        Some(x) => match x.guild() {
            Some(x) => Some(x),
            None => None,
        },
        None => None,
    }
}

async fn get_con(
    ctx: &Context,
    channel_id: ChannelId,
    message: &str,
) -> Result<PoolConnection<Postgres>, CommandError> {
    let con = {
        let data = ctx.data.read().await;
        let pool = data.get::<DbPool>().expect("No db pool?");
        pool.acquire().await
    };
    match con {
        Ok(x) => Ok(x),
        Err(x) => {
            channel_id.say(ctx, message).await?;
            Err(x.into())
        }
    }
}

async fn get_message(
    con: &mut PoolConnection<Postgres>,
    message_id: serenity::model::id::MessageId,
    guild_id: GuildId,
) -> Result<Option<(String, String, i64)>, CommandError> {
    let message = query!(
        "
            SELECT 
                author_id,
                content,
                count(role_count.role_count) as role_count
            FROM message_content
            INNER JOIN (
                SELECT 
                    COUNT(*) as role_count,
                    message_id,
                    server_id
                FROM pinged_roles
                GROUP BY message_id, server_id
            ) AS role_count
            ON (
                message_content.message_id = role_count.message_id
            AND
                message_content.server_id = role_count.server_id
            )
            WHERE message_content.message_id = $1
            AND message_content.server_id = $2
            GROUP BY author_id,content,role_count.role_count
            LIMIT 1
        ",
        i64::from(message_id),
        i64::from(guild_id)
    )
    .fetch_optional(con)
    .await?;
    dbg!((i64::from(message_id), i64::from(guild_id)));
    let res = if let Some(x) = dbg!(message) {
        Some((
            UserId::from(x.author_id as u64).mention(),
            x.content,
            x.role_count.unwrap(),
        ))
    } else {
        None
    };
    Ok(res)
}

pub(crate) async fn check_deleted_message(
    ctx: &Context,
    channel_id: serenity::model::id::ChannelId,
    message_id: serenity::model::id::MessageId,
) -> CommandResult {
    let guild = match get_guild_channel(ctx, channel_id).await {
        Some(x) => x,
        None => return Ok(()),
    };
    let mut con = get_con(
        ctx,
        channel_id,
        "Detected removed message, but couldn't check for ghost pings.",
    )
    .await?;

    let (author, content, role_count) =
        match get_message(&mut con, message_id, guild.guild_id).await? {
            None => return Ok(()),
            Some(x) => x,
        };
    channel_id
        .send_message(ctx, |v| {
            v.embed(|x| {
                x.title("Ghost ping detected in deleted message")
                    .description(format!(
                        "Author: {}
Content: {}
",
                        author, content
                    ))
            })
        })
        .await?;
    if role_count > 0 {
        let guild2 = guild.guild(ctx).await.ok_or("Could not get guild")?;
        let mod_role = guild2
            .role_by_name("Moderator")
            .ok_or("Could not get role")?;
        guild
            .say(
                ctx,
                format!(
                    "Message pinged {} amount of roles!, {}",
                    role_count,
                    mod_role.mention()
                ),
            )
            .await?;
    }
    Ok(())
}

struct HasPings {
    role_pings: bool,
    user_pings: Option<bool>,
}
impl HasPings {
    fn has_ping(&self) -> bool {
        self.role_pings || self.user_pings.unwrap_or(false)
    }
    fn role_pings(&self) -> bool {
        self.role_pings
    }
}

async fn check_deleted_pings(
    mut con: PoolConnection<Postgres>,
    message_id: i64,
    server_id: i64,
    role_pings: Vec<RoleId>,
    user_pings: Vec<User>,
) -> Result<HasPings, CommandError> {
    let old_role_pings = query!(
        "
            SELECT role_id 
            FROM pinged_roles
            WHERE message_id = $1
            AND server_id = $2
        ",
        message_id,
        server_id
    )
    .fetch_all(&mut con)
    .await?
    .iter()
    .map(|x| x.role_id)
    .collect::<Vec<i64>>();
    for role in old_role_pings {
        if !role_pings.iter().any(|v| *v.as_u64() == role as u64) {
            return Ok(HasPings {
                role_pings: true,
                user_pings: None,
            });
        }
    }
    let old_user_pings = query!(
        "
            SELECT user_id
            FROM pinged_users
            WHERE message_id = $1
            AND server_id = $2
        ",
        message_id,
        server_id
    )
    .fetch_all(&mut con)
    .await?
    .iter()
    .map(|x| x.user_id)
    .collect::<Vec<i64>>();
    for user in old_user_pings {
        if !user_pings.iter().any(|v| i64::from(v.id) == user) {
            return Ok(HasPings {
                role_pings: true,
                user_pings: None,
            });
        }
    }
    Ok(HasPings {
        user_pings: Some(false),
        role_pings: false,
    })
}

pub(crate) async fn check_edited_message(
    ctx: &Context,
    channel_id: ChannelId,
    message_id: serenity::model::id::MessageId,
    mention_roles: Vec<RoleId>,
    mention_users: Vec<User>,
) -> CommandResult {
    let guild = match get_guild_channel(ctx, channel_id).await {
        Some(x) => x,
        None => return Ok(()),
    };
    let mut con = get_con(
        ctx,
        channel_id,
        "Detected an edited message, but could not check for pings",
    )
    .await?;
    let (author, content, _) = match get_message(&mut con, message_id, guild.guild_id).await? {
        None => return Ok(()),
        Some(x) => x,
    };
    let has_pings = check_deleted_pings(
        con,
        message_id.into(),
        guild.guild_id.into(),
        mention_roles,
        mention_users,
    )
    .await?;
    if !has_pings.has_ping() {
        return Ok(());
    }
    channel_id
        .send_message(ctx, |v| {
            v.embed(|x| {
                x.title("Ghost ping detected in edited message")
                    .description(format!("Author: {}\nContent: {}", author, content))
            })
        })
        .await?;
    if has_pings.role_pings() {
        let guild2 = guild.guild(ctx).await.ok_or("Could not get guild")?;
        let mod_role = guild2
            .role_by_name("Moderator")
            .ok_or("Could not get role")?;
        guild
            .say(
                ctx,
                format!(
                    "Message originally pinged one or more roles. {}",
                    mod_role.mention()
                ),
            )
            .await?;
    }
    Ok(())
}
