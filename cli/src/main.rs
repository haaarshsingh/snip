mod cli;
mod api;
mod models;
mod languages;

use clap::Parser;
use cli::{Cli, Commands};
use tokio;

#[tokio::main]
async fn main() {
    let args = Cli::parse();

    if args.help {
        print_help();
        return;
    }

    match args.command {
        Commands::Create { title, expiry, files } => {
            let expiry = expiry.unwrap_or("never".to_string()); // Default to 'never' if no expiry is provided
            let snip_link = api::create_snip(&title, &expiry, &files).await;
            match snip_link {
                Some(link) => println!("Your snip link: {}", link),
                None => eprintln!("Failed to create snip"),
            }
        },
        Commands::Help => {
            print_help();
        }
    }
}

fn print_help() {
    println!("\nUsage Example for snip-cli:\n");
    println!("snip-cli create \"Example File\" -e \"12 hours\" file1.txt file2.rs");
    println!("\nThis will upload the files 'file1.txt' and 'file2.rs' with a 12-hour expiry time.");
    println!("\nCommands:");
    println!("\n  create: Create a new snip with multiple code files");
    println!("    -e, --expiry <value>   Set the expiry time (options: 'never', '12 hours', '24 hours')");
    println!("    <file>...               List of files to upload");

    println!("\nHelp Options:");
    println!("  --h, --help   Display this help information");
    println!("\nFor more details on a command, use 'snip-cli <command> --help'.");
}
