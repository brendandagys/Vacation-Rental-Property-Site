use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Serialize)]
pub enum ContentId {
    Header,
    HeroImage,
    Subheader,
    Description,
    Footer,
}

#[derive(Deserialize, Debug, Serialize)]
pub enum Language {
    Danish,
    Dutch,
    English,
    French,
    German,
    Spanish,
    Swedish,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct TextContent {
    pub language: Language,
    pub value: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ImageContent {
    pub url: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(untagged)]
pub enum ContentData {
    Text(TextContent),
    Image(ImageContent),
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Content {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    #[serde(rename = "contentId")]
    pub content_id: ContentId,
    pub version: u16,
    #[serde(flatten)]
    pub content_data: ContentData,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct ContentPutRequest {
    #[serde(rename = "contentId")]
    pub content_id: ContentId,
    pub version: u16,
    #[serde(flatten)]
    pub content_data: ContentData,
}
