use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct JwtClaims {
    pub username: String,
    pub last: String,
    pub first: String,
    pub exp: i64,
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
