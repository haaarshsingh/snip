use reqwest::Client;
use serde_json::json;
use std::{fs, process};
use crate::models::Snip;
use crate::languages;

const BASE_URL: &str = "https://api.snip.tf/snips";

pub async fn create_snip(title: &str, expiry: &str, files: &[String]) -> Option<String> {
    let client = Client::new();

    let snips: Vec<Snip> = files.iter().map(|file| {
        let content = fs::read_to_string(file).unwrap_or_else(|_| {
            eprintln!("Failed to read file: {}", file);
            process::exit(1);
        });

        let ext = file.split('.').last().unwrap_or("");
        let language = languages::extension_to_language(ext);

        Snip {
            title: file.to_string(),
            content,
            language,
        }
    }).collect();

    let body = json!({
        "title": title,
        "expiry": expiry,
        "snips": snips,
    });

    let response = client.post(format!("{}/create", BASE_URL))
        .json(&body)
        .send()
        .await;

    match response {
        Ok(res) if res.status().is_success() => {
            let created_snip: serde_json::Value = res.json().await.unwrap();
            Some(created_snip["link"].as_str().unwrap_or("").to_string())
        }
        Ok(res) => {
            eprintln!("Error: {}", res.status());
            None
        }
        Err(err) => {
            eprintln!("Request failed: {}", err);
            None
        }
    }
}
