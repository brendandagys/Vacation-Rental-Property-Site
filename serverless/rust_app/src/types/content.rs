use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub enum ContentId {
    Header,
    Subheader,
    Description,
    Footer,
}

#[derive(Deserialize, Debug)]
pub enum Language {
    Danish,
    Dutch,
    English,
    French,
    German,
    Spanish,
    Swedish,
}

#[derive(Deserialize)]
pub struct TextContent {
    pub language: Language,
    pub value: String,
}

#[derive(Deserialize)]
pub struct ImageContent {
    pub url: String,
}

#[derive(Deserialize)]
pub enum ContentData {
    Text(TextContent),
    Image(ImageContent),
}

#[derive(Deserialize)]
pub struct Content {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub content_id: ContentId,
    pub version: u16,
    pub content_data: ContentData,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct ContentPutRequest {
    pub content_id: ContentId,
    pub version: u16,
    pub content_data: ContentData,
}
