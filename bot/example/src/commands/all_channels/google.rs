use serenity::{
    client::Context,
    framework::standard::{macros::command, CommandResult},
    model::channel::Message,
};

#[command]
#[aliases("browser", "internet")]
#[description("Reminds users that google is a thing")]
#[usage("")]
#[example = ""]
#[help_available]
#[bucket = "potentially_big_output_ever_channel"]
pub(crate) async fn google(ctx: &Context, msg: &Message) -> CommandResult {
    msg.channel_id
        .say(
            &ctx.http,
            "Looks like something <https://www.google.com/> would know!",
        )
        .await?;
    Ok(())
}
