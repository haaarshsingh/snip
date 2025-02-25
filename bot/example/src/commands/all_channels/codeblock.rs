use serenity::{
    client::Context,
    framework::standard::{macros::command, CommandResult},
    model::channel::Message,
};

#[command]
#[aliases("paste", "code")]
#[description("Teaches users how to paste code neatly")]
#[usage("")]
#[example = ""]
#[help_available]
#[bucket = "potentially_big_output_ever_channel"]
pub(crate) async fn codeblock(ctx: &Context, msg: &Message) -> CommandResult {
    msg.channel_id
        .say(
            &ctx.http,
"**Use Codeblocks To Paste Your Code**
If the code is larger than 2,000 characters, then consider using a service such as <https://paste.myst.rs/>
\\``` scripting language
    //your code here
\\```",
        )
        .await?;
    Ok(())
}
