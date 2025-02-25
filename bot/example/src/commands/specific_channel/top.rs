use crate::commands::is_in_incorrect_channel;
use crate::utils::{BotId, DbPool};
use prettytable::{Cell, Row, Table};
use serenity::{
    client::Context,
    framework::standard::{macros::command, CommandResult},
    model::{channel::Message, id::UserId},
    prelude::ModelError,
    Error,
};
use sqlx::query;
use tokio::stream::StreamExt;

#[command]
#[bucket = "potentially_big_output"]
#[aliases("list")]
#[description(
    "Show the people who got thanked the most, mostly for the mods so they can give rewards."
)]
#[usage("")]
#[only_in("guild")]
pub(crate) async fn top(ctx: &Context, msg: &Message) -> CommandResult {
    let server_id = match msg.guild_id {
        Some(x) => i64::from(x),
        None => return Ok(()),
    };

    if is_in_incorrect_channel(ctx, msg).await {
        return Ok(());
    }
    let (mut con, own_id) = {
        let data = ctx.data.read().await;
        let id = i64::from(*data.get::<BotId>().expect("No bot id set"));
        let pool = data.get::<DbPool>().expect("No db pool?");
        (pool.acquire().await?, id)
    };
    let res: Vec<(UserId, i64)> = query!(
        "SELECT user_id, times
        FROM thanked_users
        WHERE user_id != $1
        AND server_id = $2
        ORDER BY times DESC
        LIMIT 10",
        own_id,
        server_id
    )
    .fetch(&mut con)
    .map(|v| v.map(|v| (UserId::from(v.user_id as u64), v.times)))
    .collect::<Result<_, _>>()
    .await?;

    let header_row = Row::new(vec![Cell::new("name"), Cell::new("times")]);
    let mut table = Table::new();
    table.set_format(*prettytable::format::consts::FORMAT_NO_LINESEP_WITH_TITLE);
    table.set_titles(header_row);

    for (user_id, times) in res {
        let name = match (user_id.to_user(&ctx).await, msg.guild_id) {
            (Ok(user), Some(guild)) => user.nick_in(&ctx, guild).await.unwrap_or(user.name),
            (Ok(user), None) => user.name,
            (Err(x), _) => match x {
                Error::Model(model) => match model {
                    ModelError::InvalidUser => String::from("InvalidUser"),
                    x => return Err(Error::Model(x).into()),
                },
                x => return Err(x.into()),
            },
        };
        table.add_row(Row::new(vec![
            Cell::new(&name),
            Cell::new(&times.to_string()),
        ]));
    }

    let mut message = String::from("The top most thanked users are\n");
    message.push_str("```\n");
    message.push_str(&table.to_string());
    message.push_str("\n```");
    msg.channel_id.say(&ctx.http, message).await?;

    Ok(())
}
