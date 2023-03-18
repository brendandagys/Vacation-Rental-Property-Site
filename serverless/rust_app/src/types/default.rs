use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub enum DefaultFor {
    JanuaryPrice,
    FebruaryPrice,
    MarchPrice,
    AprilPrice,
    MayPrice,
    JunePrice,
    JulyPrice,
    AugustPrice,
    SeptemberPrice,
    OctoberPrice,
    NovemberPrice,
    DecemberPrice,
}

#[derive(Deserialize)]
pub struct Default {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub default_for: DefaultFor,
    pub value: String,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct DefaultPutRequest {
    pub default_for: DefaultFor,
    pub value: String,
}
