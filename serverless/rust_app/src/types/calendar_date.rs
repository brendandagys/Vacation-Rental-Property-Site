use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub enum DateState {
    Available,
    Booked,
    Unavailable,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CalendarDate {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub ymd: String,
    pub state: Option<DateState>,
    pub price: u16,
    pub year: u16,
    pub month: u8,
    pub date: u8,
    pub cell_color: Option<String>,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct CalendarDatePutRequest {
    pub ymd: String,
    pub state: Option<DateState>,
    pub price: u16,
    pub year: u16,
    pub month: u8,
    pub date: u8,
    pub cell_color: Option<String>,
}
