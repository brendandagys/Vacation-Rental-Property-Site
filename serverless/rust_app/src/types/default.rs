use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Debug, PartialEq, Serialize)]
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

pub const DEFAULT_PRICE: &str = "100";

impl std::convert::TryFrom<u8> for DefaultFor {
    type Error = String;

    fn try_from(value: u8) -> Result<Self, Self::Error> {
        match value {
            1 => Ok(DefaultFor::PriceJanuary),
            2 => Ok(DefaultFor::PriceFebruary),
            3 => Ok(DefaultFor::PriceMarch),
            4 => Ok(DefaultFor::PriceApril),
            5 => Ok(DefaultFor::PriceMay),
            6 => Ok(DefaultFor::PriceJune),
            7 => Ok(DefaultFor::PriceJuly),
            8 => Ok(DefaultFor::PriceAugust),
            9 => Ok(DefaultFor::PriceSeptember),
            10 => Ok(DefaultFor::PriceOctober),
            11 => Ok(DefaultFor::PriceNovember),
            12 => Ok(DefaultFor::PriceDecember),
            _ => Err("Must provide a number between `1` and `12`.".into()),
        }
    }
}
impl std::convert::TryFrom<&str> for DefaultFor {
    type Error = String;

    fn try_from(value: &str) -> Result<Self, Self::Error> {
        match value {
            "01" => Ok(DefaultFor::PriceJanuary),
            "02" => Ok(DefaultFor::PriceFebruary),
            "03" => Ok(DefaultFor::PriceMarch),
            "04" => Ok(DefaultFor::PriceApril),
            "05" => Ok(DefaultFor::PriceMay),
            "06" => Ok(DefaultFor::PriceJune),
            "07" => Ok(DefaultFor::PriceJuly),
            "08" => Ok(DefaultFor::PriceAugust),
            "09" => Ok(DefaultFor::PriceSeptember),
            "10" => Ok(DefaultFor::PriceOctober),
            "11" => Ok(DefaultFor::PriceNovember),
            "12" => Ok(DefaultFor::PriceDecember),
            _ => Err("Must provide a string slice in range `01` - `12`.".into()),
        }
    }
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Default {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    #[serde(rename(serialize = "defaultFor"))]
    pub default_for: DefaultFor,
    pub value: String,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct DefaultPutRequest {
    #[serde(rename(deserialize = "defaultFor"))]
    pub default_for: DefaultFor,
    pub value: String,
}
