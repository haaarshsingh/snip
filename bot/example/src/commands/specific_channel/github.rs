use crate::commands::is_in_incorrect_channel;
use serenity::{
    client::Context,
    framework::standard::{macros::command, CommandResult},
    model::channel::Message,
};

#[command]
#[aliases("code", "gh")]
#[description("Links the github link")]
#[usage("")]
#[example = ""]
#[help_available]
#[bucket = "potentially_big_output"]
pub(crate) async fn github(ctx: &Context, msg: &Message) -> CommandResult {
    if is_in_incorrect_channel(ctx, msg).await {
        return Ok(());
    }
    msg.channel_id
        .say(
            &ctx.http,
            "My code is here: <https://github.com/lenscas/thanks_bot>",
        )
        .await?;
    Ok(())
}
#[command]
#[aliases("NO!", "BROKEN", "PLEASE_FIX")]
#[description("Links the site to place bug reports")]
#[usage("")]
#[example = ""]
#[help_available]
#[bucket = "potentially_big_output"]
pub(crate) async fn bug(ctx: &Context, msg: &Message) -> CommandResult {
    if is_in_incorrect_channel(ctx, msg).await {
        return Ok(());
    }
    msg.channel_id
        .say(
            &ctx.http,
            "Please fill an bug report at <https://github.com/lenscas/thanks_bot/issues> so my developer can fix me.",
        )
        .await?;
    Ok(())
}
