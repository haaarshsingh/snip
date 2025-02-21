use clap::{Args, Parser, Subcommand};

#[derive(Parser)]
#[command(name = "snip-cli")]
#[command(version = "1.0")]
#[command(about = "A CLI tool to interact with Snip API", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,

    #[arg(long, help = "Display detailed help information", global = true)]
    pub help: bool,
}

#[derive(Subcommand)]
pub enum Commands {
    Create {
        #[arg(help = "Title of the snip")]
        title: String,

        #[arg(
            short,
            long,
            default_value = "never",
            help = "Expiry of the snip (options: never, 12 hours, 24 hours)"
        )]
        expiry: Option<String>,

        #[arg(help = "List of files to upload")]
        files: Vec<String>,
    },

    Help,
}
