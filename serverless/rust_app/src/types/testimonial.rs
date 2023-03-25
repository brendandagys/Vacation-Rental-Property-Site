use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub enum Stars {
    Zero,
    Half,
    One,
    OneAndAHalf,
    Two,
    TwoAndAHalf,
    Three,
    ThreeAndAHalf,
    Four,
    FourAndAHalf,
    Five,
}

#[derive(Clone, Deserialize, Serialize)]
pub struct Testimonial {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub email: String,
    pub stars: Stars,
    pub title: String,
    pub comment: String,
    pub active: bool,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Clone, Deserialize)]
pub struct TestimonialPutRequest {
    pub email: String,
    pub stars: Stars,
    pub title: String,
    pub comment: String,
    pub active: bool,
}

#[derive(Clone, Deserialize, Serialize)]
pub struct TestimonialQueryResponse {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub email: String,
    pub stars: f32,
    pub title: String,
    pub comment: String,
    pub active: bool,
    pub created: String,
    pub modified: Option<String>,
}
