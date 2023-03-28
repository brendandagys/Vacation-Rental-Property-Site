use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Serialize)]
pub enum DefaultFor {
    PriceJanuary,
    PriceFebruary,
    PriceMarch,
    PriceApril,
    PriceMay,
    PriceJune,
    PriceJuly,
    PriceAugust,
    PriceSeptember,
    PriceOctober,
    PriceNovember,
    PriceDecember,
}

#[derive(Debug, Deserialize, Serialize)]
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
