use crate::api;
use crate::languages;
use crate::models::Snip;
use reqwest::Client;
use serenity::framework::standard::macros::command;
use serenity::framework::standard::{
    macros::{command, group},
    CommandResult, StandardFramework,
};
use serenity::model::prelude::*;
use serenity::{
    async_trait,
    model::{channel::Message, gateway::Ready},
    prelude::*,
};
use std::{collections::HashMap, fs};

#[group]
#[commands(snippet)]
struct General;

pub struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, _: Ready) {
        println!("Bot is ready!");
    }
}

#[command]
async fn snippet(ctx: &Context, msg: &Message) -> CommandResult {
    // Get message content (assumes the command starts with '!'
    let args: Vec<String> = msg.content.split_whitespace().map(String::from).collect();

    if args.len() < 2 {
        msg.channel_id
            .say(&ctx.http, "Usage: `!snippet <expiry> <file1> <file2>`")
            .await?;
        return Ok(());
    }

    let expiry = args[0].to_string();
    let files = args[1..].to_vec();

    let snip_link = api::create_snip(&expiry, &files).await;
    match snip_link {
        Some(link) => {
            msg.channel_id
                .say(&ctx.http, format!("Here is your snip link: {}", link))
                .await?
        }
        None => {
            msg.channel_id
                .say(&ctx.http, "Failed to create snip")
                .await?
        }
    }

    Ok(())
}

pub async fn start_bot() {
    let token = "YOUR_BOT_TOKEN";

    let mut client = Client::new();

    let framework = StandardFramework::new()
        .configure(|c| c.prefix("!"))
        .group(&GENERAL_GROUP);

    let mut client = Client::builder(token)
        .event_handler(Handler)
        .framework(framework)
        .await
        .expect("Error creating client");

    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why);
    }
}
