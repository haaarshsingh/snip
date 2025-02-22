use dotenv::dotenv;
use serde::Deserialize;
use serenity::model::gateway::GatewayIntents;
use serenity::{
    async_trait,
    framework::standard::{macros::group, StandardFramework},
    model::gateway::Ready,
    prelude::*,
};
use std::{env, fs};

mod commands;
use commands::{help::*, snip::*};

#[group]
#[commands(snip)]
struct General;

struct Handler {
    config: Config,
}

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, _: Context, ready: Ready) {
        println!("Connected to {}.", ready.user.name);
    }
}

#[derive(Debug, Deserialize)]
struct Config {
    prefix: String,
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    let token = env::var("DISCORD_TOKEN").expect("Expected a token in the environment");

    let config_file = fs::read_to_string("config.json").expect("Failed to read config.json");
    let config: Config = serde_json::from_str(&config_file).expect("Failed to parse config.json");

    let framework = StandardFramework::new()
        .configure(|c| c.prefix(&config.prefix))
        .group(&GENERAL_GROUP);

    let intents = GatewayIntents::GUILD_MESSAGES | GatewayIntents::MESSAGE_CONTENT;

    let mut client: Client = Client::builder(&token, intents)
        .event_handler(Handler { config })
        .framework(framework)
        .await
        .expect("Err creating client");

    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why);
    }
}
