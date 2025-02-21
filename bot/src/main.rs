mod api;
mod bot;
mod languages;
mod models;

use bot::start_bot;

#[tokio::main]
async fn main() {
    start_bot().await;
}
