use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Snip {
    pub title: String,
    pub content: String,
    pub language: String,
}
