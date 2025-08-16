use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
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

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Testimonial {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub name: Option<String>, // Backwards compatibility, locally
    pub stars: f32,
    pub title: String,
    pub comment: String,
    pub active: bool,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct TestimonialPutRequest {
    pub name: String,
    pub stars: Stars,
    pub title: String,
    pub comment: String,
    pub active: bool,
}

#[derive(Deserialize)]
pub struct TestimonialToggleRequest {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    pub active: bool,
}
