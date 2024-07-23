use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Snip {
    pub id: String,
    pub title: String,
    pub content: String,
    pub language: Option<String>,
}
