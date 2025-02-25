use serenity::{
    client::Context,
    framework::standard::{macros::command, CommandResult},
    model::channel::Message,
};

#[command]
#[aliases("code", "learn")]
#[description("Gives handy programming links")]
#[usage("")]
#[example = ""]
#[help_available]
#[bucket = "potentially_big_output_ever_channel"]
pub(crate) async fn learnprogramming(ctx: &Context, msg: &Message) -> CommandResult {
    msg.channel_id
        .say(
            &ctx.http,
            "**__Learn The Basics of Programming__**
*These following courses explain the basics of programming, and give you a solid base.*
          
<https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x>
<https://www.reddit.com/r/learnprogramming/comments/61oly8/new_read_me_first/>
<https://www.reddit.com/r/learnprogramming/wiki/faq#wiki_getting_started>
          
*This server is not affiliated with these courses in any way.*",
        )
        .await?;
    Ok(())
}
