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
    pub state: DateState,
    pub price: u16,
    pub year: u16,
    pub month: u8,
    pub date: u8,
    #[serde(rename(serialize = "cellColor"))]
    pub cell_color: Option<String>,
    pub created: String,
    pub modified: Option<String>,
}

impl CalendarDate {
    pub fn new(
        ymd: String,
        state: Option<DateState>,
        price: u16,
        year: u16,
        month: u8,
        date: u8,
        cell_color: Option<String>,
        created: String,
    ) -> Self {
        let ensure_state = state.unwrap_or(DateState::Available);

        Self {
            primary_key: "DATE".into(),
            sort_key: ymd.clone(),
            gsi_primary_key: "DATE".into(),
            gsi_sort_key: format!("{:?}", ensure_state),
            ymd,
            state: ensure_state,
            price,
            year,
            month,
            date,
            cell_color,
            created,
            modified: None,
        }
    }
}

#[derive(Deserialize)]
pub struct CalendarDatePutRequest {
    pub ymd: String,
    pub state: Option<DateState>,
    pub price: u16,
    pub year: u16,
    pub month: u8,
    pub date: u8,
    #[serde(rename(deserialize = "cellColor"))]
    pub cell_color: Option<String>,
}
