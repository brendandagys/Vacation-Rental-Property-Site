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

#[derive(Debug, serde::Serialize)]
pub enum DateState {
    Available,
    Booked,
    Unavailable,
}

#[derive(Debug, serde::Deserialize)]
pub struct LogInRequest {
    pub email: Option<String>,
    pub password: Option<String>,
}

#[derive(Debug, serde::Deserialize)]
pub struct GetCalendarDatesByDateRequest {
    pub dates: Option<Vec<String>>,
}

#[derive(Debug, serde::Serialize)]
pub struct GetCalendarDatesByDateResponse {
    pub calendar_dates: Vec<CalendarDate>,
}

#[derive(serde::Serialize)]
pub struct JwtContent {
    pub email: String,
    pub last: String,
    pub first: String,
}

#[derive(serde::Serialize)]
pub struct LogInResponse {
    pub token: String,
}

#[derive(Debug, serde::Serialize)]
pub struct CalendarDate {
    pub ymd: String,
    pub state: Option<DateState>,
    pub price: Option<u16>,
    pub year: Option<u16>,
    pub month: Option<u8>,
    pub date: Option<u8>,
    pub cell_color: Option<String>,
    pub created: Option<String>,
    pub modified: Option<String>,
}

struct Request {
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
