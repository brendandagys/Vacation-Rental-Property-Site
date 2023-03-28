use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum BookingInquiryState {
    New,
    InProgress,
    Rejected,
    Accepted,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct BookingInquiry {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub state: BookingInquiryState,
    pub email: String,
    #[serde(rename = "fromTo")]
    pub from_to: Option<String>,
    pub last: Option<String>,
    pub first: Option<String>,
    pub phone: Option<String>,
    pub subtotal: Option<String>,
    #[serde(rename = "adultCount")]
    pub adult_count: Option<u8>,
    #[serde(rename = "childCount")]
    pub child_count: Option<u8>,
    pub message: String,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Clone, Deserialize)]
pub struct BookingInquiryPutRequest {
    pub state: Option<BookingInquiryState>,
    pub email: String,
    #[serde(rename = "fromTo")]
    pub from_to: Option<String>,
    pub last: Option<String>,
    pub first: Option<String>,
    pub phone: Option<String>,
    pub subtotal: Option<String>,
    #[serde(rename = "adultCount")]
    pub adult_count: Option<u8>,
    #[serde(rename = "childCount")]
    pub child_count: Option<u8>,
    pub message: String,
}
