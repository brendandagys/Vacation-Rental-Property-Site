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

enum DateState {
    Available,
    Booked,
    Unavailable,
}

#[derive(Debug, serde::Deserialize)]
pub struct LogInRequest {
    pub email: Option<String>,
    pub password: Option<String>,
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

struct Date {
    ymd: String,
    state: Option<DateState>,
    price: Option<u16>,
    year: Option<u16>,
    month: Option<u8>,
    date: Option<u8>,
    cell_color: Option<String>,
    created: Option<String>,
    modified: Option<String>,
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
