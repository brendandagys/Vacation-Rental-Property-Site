use serde::{Deserialize, Serialize};

struct User {
    email: String,
    last: Option<String>,
    first: Option<String>,
    administrator: Option<bool>,
    hash: Option<String>,
    phone: Option<String>,
    created: Option<String>,
    modified: Option<String>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum DateState {
    Available,
    Booked,
    Unavailable,
}

#[derive(Debug, Deserialize)]
pub struct LogInRequest {
    pub email: Option<String>,
    pub password: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct GetCalendarDatesByDateRequest {
    pub dates: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct GetCalendarDatesByDateResponse {
    pub calendar_dates: Vec<CalendarDate>,
}

#[derive(Serialize)]
pub struct JwtContent {
    pub email: String,
    pub last: String,
    pub first: String,
}

#[derive(Serialize)]
pub struct LogInResponse {
    pub token: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CalendarDate {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    pub ymd: String,
    pub state: Option<DateState>,
    pub price: Option<u16>,
    pub year: u16,
    pub month: u8,
    pub date: u8,
    pub cell_color: Option<String>,
    pub created: Option<String>,
    pub modified: Option<String>,
}

struct BookingRequest {
    email: String,
    from_to_string: String,
    last: Option<String>,
    first: Option<String>,
    phone: Option<String>,
    subtotal: Option<String>,
    adult_count: Option<u8>,
    child_count: Option<u8>,
    created: Option<String>,
    modified: Option<String>,
}

struct Testimonial {
    email: String,
    stars: Option<String>,
    title: Option<String>,
    comment: Option<String>,
    created: String,
    modified: Option<String>,
}

struct Content {
    id: String,
    version: u32,
    content_type: Option<String>,
    value: Option<String>,
    created: Option<String>,
    modified: Option<String>,
}

struct Default {
    default_for: String,
    price: Option<String>,
    created: Option<String>,
    modified: Option<String>,
}
