use serenity::framework::standard::{macros::command, Args, CommandResult};
use serenity::model::prelude::*;
use serenity::prelude::*;

#[command]
async fn help(ctx: &Context, msg: &Message, _args: Args) -> CommandResult {
    let help_text = "
**Available Commands:**

1. `!snip` - Snip and share codeblocks:
   - Usage: `!snip -t <title> <code>`
   - Example: `!snip -t 'My Code' \`\`\`python\nprint('Hello, World!')\n\`\`\``

2. `!help` - Shows this help message.

**Prefix**: The current prefix is `!` (configured in `config.json`).

For more information or issues, visit [GitHub Issues](https://github.com/haaarshsingh/snip/issues).
    ";

    msg.channel_id
        .say(ctx, help_text)
        .await?;

    Ok(())
}
