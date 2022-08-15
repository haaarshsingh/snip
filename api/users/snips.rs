extern crate dotenv;
use dotenv::dotenv;
use std::env;

use http::StatusCode;
use postgrest::Postgrest;
use std::error::Error;
use vercel_lambda::{error::VercelError, lambda, IntoResponse, Request, Response};

fn handler(_: Request) -> Result<impl IntoResponse, VercelError> {
    let client = Postgrest::new("https://araasnleificjyjflqml.supabase.co/rest")
        .insert_header("apikey", &env::var("SUPABASE_API_KEY").unwrap());

    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "text/plain")
        .body("Hello World")
        .expect("Internal Server Error");

    Ok(response)
}

fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();
    Ok(lambda!(handler))
}
