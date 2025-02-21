use chrono;
use chrono::serde::ts_seconds_option;
use nanoid::nanoid;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct SnipObject {
    pub snips: Vec<Snip>,
    pub _id: Option<String>,
    pub title: Option<String>,
    #[serde(
        with = "ts_seconds_option",
        skip_serializing_if = "Option::is_none",
        default
    )]
    created_at: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(
        with = "ts_seconds_option",
        skip_serializing_if = "Option::is_none",
        default
    )]
    expiry_at: Option<chrono::DateTime<chrono::Utc>>,
}

impl SnipObject {
    pub fn with_creation_time(mut self) -> Self {
        if self.created_at.is_none() {
            self.created_at = Some(chrono::Utc::now());
        }
        self
    }

    pub fn with_id(mut self) -> Self {
        if self._id.is_none() {
            self._id = Some(nanoid!(3));
        }
        self
    }
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Snip {
    pub content: String,
    pub title: Option<String>,
    pub language: Option<String>,
}
