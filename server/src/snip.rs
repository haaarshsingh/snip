use serde::{Deserialize, Serialize};
use chrono;
use chrono::serde::ts_seconds_option;

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct SnipObject {
    pub snips: Vec<Snip>,
    pub _id: Option<String>,
    pub title: Option<String>,
    #[serde(with = "ts_seconds_option")]
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(with = "ts_seconds_option")]
    pub expiry_at: Option<chrono::DateTime<chrono::Utc>>, 
}

impl SnipObject {
    pub fn set_expiry(mut self, days: i64) -> Self {
        if self.created_at.is_none() {
            self.created_at = Some(chrono::Utc::now());
        }
        self.expiry_at = Some(self.created_at.unwrap() + chrono::Duration::days(days));
        self
    }
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Snip {
    pub content: String,
    pub _id: Option<String>,
    pub title: Option<String>,
    pub language: Option<String>,
}
