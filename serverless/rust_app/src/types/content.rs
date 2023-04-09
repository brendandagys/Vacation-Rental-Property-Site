use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Debug, Serialize)]
pub enum ContentId {
    Header,
    HeroImage,
    Subheader,
    Description,
    Footer,
}

#[derive(Clone, Deserialize, Debug, Serialize)]
pub enum Language {
    Danish,
    Dutch,
    English,
    French,
    German,
    Spanish,
    Swedish,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TextContent {
    pub language: Language,
    pub value: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ImageContent {
    pub url: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(untagged)]
pub enum ContentData {
    Text(TextContent),
    Image(ImageContent),
}

#[derive(Debug)]
pub enum ContentDataType {
    TEXT,
    IMAGE,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Content {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    #[serde(rename(serialize = "contentId"))]
    pub content_id: ContentId,
    pub version: u16,
    #[serde(flatten)]
    pub content_data: ContentData,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct ContentPutRequest {
    #[serde(rename(deserialize = "contentId"))]
    pub content_id: ContentId,
    #[serde(flatten)]
    pub content_data: ContentData,
}

#[derive(Deserialize)]
pub struct FinalContentPutRequest {
    #[serde(rename(deserialize = "contentId"))]
    pub content_id: ContentId,
    pub version: u16,
    #[serde(flatten)]
    pub content_data: ContentData,
}
