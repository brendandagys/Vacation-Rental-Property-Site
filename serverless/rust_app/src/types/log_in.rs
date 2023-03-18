use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct JwtContent {
    pub email: String,
    pub last: String,
    pub first: String,
}

#[derive(Debug, Deserialize)]
pub struct LogInRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LogInResponse {
    pub token: String,
}
