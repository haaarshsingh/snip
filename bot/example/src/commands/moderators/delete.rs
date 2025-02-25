use chrono::{Duration, Utc};
use serenity::{
    client::Context,
    framework::standard::{macros::command, Args, CommandResult},
    model::channel::Message,
};
use std::fmt::Display;

use crate::utils::is_moderator;

#[derive(Debug, Clone, Eq, PartialEq)]
pub(crate) struct ErrorStr(String);
impl Display for ErrorStr {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.0.fmt(f)
    }
}
impl std::error::Error for ErrorStr {}
impl From<String> for ErrorStr {
    fn from(x: String) -> Self {
        ErrorStr(x)
    }
}

#[command]
#[allowed_roles("Moderator", "ThankBotManager")]
#[aliases("del", "remove", "be_gone")]
#[description("Removes X amount of messages that are less than 2 weeks old.")]
#[usage("{amount of messages to be removed}")]
#[example = "5"]
#[help_available]
#[only_in("guild")]
pub(crate) async fn delete(ctx: &Context, msg: &Message, mut args: Args) -> CommandResult {
    //its + 2 to compensate for the message of the bot AND the command message
    let amount_of_messages: u64 = args.single::<u64>()? + 2;

    let guild = msg.guild(&ctx).await.ok_or("not in guild")?;
    if !is_moderator(ctx, &guild, &msg.author).await? {
        return Ok(());
    }
    //it needs multiple requests to do something, thus it can be quite slow
    //let the caller know that something is happening
    msg.channel_id.say(&ctx.http, "Working on it!").await?;

    let channel = msg.channel(ctx).await.ok_or("no channel")?.id().into();
    //discord only allows you to delete messages that are less than 2 weeks old
    //this is to compare them
    let two_weeks_ago = Utc::now()
        .checked_sub_signed(Duration::weeks(2))
        .ok_or("could not get minimal date")?;
    //get every message id that needs to be deleted
    let message_ids: Vec<_> = ctx
        .http
        .get_messages(channel, &format!("?limit={}", amount_of_messages))
        .await?
        .into_iter()
        .filter(|v| v.timestamp > two_weeks_ago)
        .map(|v| v.id)
        .collect();

    //delete them
    let res = ctx
        .http
        .delete_messages(channel, &serde_json::json!({ "messages": message_ids }))
        .await;

    //let people know if something broke
    if res.is_err() {
        msg.channel_id
            .say(&ctx.http, "Something wend wrong :(")
            .await?;
    }
    res?;
    Ok(())
}
