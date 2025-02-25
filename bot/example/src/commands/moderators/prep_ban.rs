use crate::utils::is_moderator;
use serenity::{
    client::Context,
    framework::standard::{macros::command, Args, CommandResult},
    model::channel::Message,
    model::misc::Mentionable,
};

#[command]
#[allowed_roles("Moderator", "ThankBotManager")]
#[description(
    "Prepares someone to get banned by muting them and by copying the given amount of messages to the log channel"
)]
#[usage("{user},{amount_of_messages}")]
#[aliases("ban", "prepBan", "prepban")]
#[example = "@thanks_bot, 10"]
#[help_available]
#[only_in("guild")]
pub(crate) async fn prep_ban(ctx: &Context, msg: &Message, args: Args) -> CommandResult {
    match contain_error(ctx, msg, args).await {
        Ok(_) => Ok(()),
        Err(x) => {
            msg.channel_id
                .say(ctx, "Something has gone wrong while prepping the ban.")
                .await?;
            Err(x)
        }
    }
}
async fn contain_error(ctx: &Context, msg: &Message, mut args: Args) -> CommandResult {
    let mentioned = msg.mentions.first().ok_or("Didn't mention anyone")?.clone();
    let amount_of_messages = args
        .single::<u64>()
        .map_err(|_| {
            args.advance();
            args.single::<u64>()
        })
        .or_else(|v| v)
        .map_err(|_| {
            let mut other_way = Args::new(&msg.content, &[" ".into()]);
            other_way.advance();
            other_way.single().map_or_else(
                |_| {
                    other_way.advance();
                    other_way.single()
                },
                Ok,
            )
        })
        .or_else(|v| v)?;

    let guild = match msg.guild(&ctx).await {
        Some(x) => x,
        None => return Ok(()),
    };
    if !is_moderator(ctx, &guild, &msg.author).await? {
        return Ok(());
    }

    let mute_role = guild
        .role_by_name(&dotenv::var("MUTE_ROLE")?)
        .ok_or("Could not find mute role")?;

    let mut member = guild.member(ctx, mentioned.id).await?;
    member.add_role(ctx, mute_role.id).await?;

    let messages = ctx
        .http
        .get_messages(
            msg.channel_id.into(),
            &format!("?limit={}", amount_of_messages),
        )
        .await?;
    let mut file_contents = String::with_capacity(messages.len() * 10);
    for message in messages {
        file_contents.push_str(&format!(
            "{} {} : {}\n-----------\n",
            message.timestamp,
            message
                .author_nick(ctx)
                .await
                .unwrap_or(message.author.name),
            message.content
        ))
    }
    let evidence_channel = guild
        .channel_id_from_name(ctx, &dotenv::var("EVIDENCE_CHANNEL")?)
        .await
        .ok_or("No channel found with the given name")?;

    evidence_channel
        .send_message(ctx, |v| {
            v.content(&format!(
                "Offender: {} {} {}",
                mentioned.name,
                mentioned.id,
                mentioned.mention()
            ))
            .add_file((file_contents.as_bytes(), "messages.txt"))
        })
        .await?;
    Ok(())
}
