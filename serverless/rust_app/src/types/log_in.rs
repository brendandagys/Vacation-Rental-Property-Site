use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct JwtContent {
    pub username: String,
    pub last: String,
    pub first: String,
}

#[derive(Debug, Deserialize)]
pub struct LogInRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LogInResponse {
    pub token: String,
}
