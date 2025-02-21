mod cli;
mod api;
mod models;
mod languages;

use clap::Parser;
use cli::Cli;
use tokio;

#[tokio::main]
async fn main() {
    let args = Cli::parse();

    let expiry = args.expiry.unwrap_or("never".to_string());

    match args.command {
        cli::Commands::Create { title, expiry, files } => {
            let snip_link = api::create_snip(&title, &expiry, &files).await;
            match snip_link {
                Some(link) => println!("Your snip link: {}", link),
                None => eprintln!("Failed to create snip"),
            }
        }
    }
}
