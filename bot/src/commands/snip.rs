use serenity::framework::standard::{macros::command, CommandResult};
use serenity::model::prelude::*;
use serenity::prelude::*;

#[command]
async fn snip(ctx: &Context, msg: &Message) -> CommandResult {
    let codeblocks = extract_codeblocks(&msg.content);

    if codeblocks.is_empty() {
        msg.reply(ctx, "No codeblocks found!").await?;
    } else {
        let mut response = String::new();
        for codeblock in codeblocks {
            response.push_str(&format!(
                "Language: {}\nContent: {}",
                codeblock.language, codeblock.content
            ));
        }
        msg.channel_id.say(ctx, response).await?;
    }
    Ok(())
}

fn extract_codeblocks(message: &str) -> Vec<CodeBlock> {
    let mut codeblocks = Vec::new();
    let mut in_codeblock = false;
    let mut language = String::new();
    let mut content = String::new();

    for line in message.lines() {
        if line.starts_with("```") {
            if in_codeblock {
                // End of codeblock
                codeblocks.push(CodeBlock {
                    language: language.clone(),
                    content: content.clone(),
                });
                in_codeblock = false;
                language.clear();
                content.clear();
            } else {
                // Start of codeblock
                in_codeblock = true;
                language = line.trim_start_matches("```").to_string();
            }
        } else if in_codeblock {
            content.push_str(line);
            content.push('\n');
        }
    }

    codeblocks
}

#[derive(Debug)]
struct CodeBlock {
    language: String,
    content: String,
}
