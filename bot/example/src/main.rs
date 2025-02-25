mod commands;
mod handler;
mod hooks;
mod logger;
mod tasks;
mod utils;

use std::time::Duration;

use dotenv::var;
use handler::Handler;
use serenity::framework::standard::StandardFramework;
use serenity::prelude::*;
use sqlx::PgPool;
use tasks::cleanup_db;

use futures::stream::StreamExt;

use crate::{
    commands::{ALLCHANNELS_GROUP, MODERATORS_GROUP, MY_HELP, SPECIFICCHANNEL_GROUP},
    hooks::after,
    utils::DbPool,
};

#[tokio::main]
async fn main() {
    dotenv::dotenv().expect("Could not read .env file");

    //these are just to make sure they exist at startup
    var("MUTE_ROLE").expect("No MUTE_ROLE set in .env");
    var("EVIDENCE_CHANNEL").expect("No EVIDENCE_CHANNEL set in .env");

    let discord_token = var("DISCORD_TOKEN").expect("DISCORD_TOKEN is not set.");
    let db_url = var("DATABASE_URL").expect("DATABASE_URL is not set.");
    let pool = PgPool::connect(&db_url)
        .await
        .expect("Couldn't connect to database");
    let pool_db_cleanup = pool.clone();

    let framework = StandardFramework::new()
        .configure(|c| {
            c.with_whitespace(true)
                .prefix(&var("COMMAND_SYMBOL").expect("Could not get the command symbol"))
                .delimiters(vec![", ", ","])
        })
        .help(&MY_HELP)
        .group(&SPECIFICCHANNEL_GROUP)
        .group(&ALLCHANNELS_GROUP)
        .group(&MODERATORS_GROUP)
        .after(after);
    let mut client = Client::new(&discord_token)
        .event_handler(Handler)
        .framework(framework)
        .await
        .expect("Err creating client");

    {
        let mut data = client.data.write().await;
        data.insert::<DbPool>(pool);
    }

    let client_thread = async {
        if let Err(why) = client.start().await {
            println!("Client error: {:?}", why);
        }
    };

    let cleanup_thread = tokio::time::interval(Duration::from_secs(1800)).for_each(|_| async {
        println!("Start cleanup db");
        match cleanup_db(&pool_db_cleanup).await {
            Ok(_) => println!("cleaned up db"),
            Err(x) => {
                println!("Error during cleanup");
                let _ = dbg!(x);
            }
        }
    });

    futures::future::join(client_thread, cleanup_thread).await;
}
