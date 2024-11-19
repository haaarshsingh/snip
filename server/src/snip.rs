use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct SnipObject {
    pub snips: Vec<Snip>,
    pub _id: Option<String>,
    pub title: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Snip {
    pub content: String,
    pub _id: Option<String>,
    pub title: Option<String>,
    pub language: Option<String>,
}
