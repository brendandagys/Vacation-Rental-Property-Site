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

#[derive(Debug, Deserialize)]
pub struct ValidateTokenRequest {
    pub token: String,
}

#[derive(Deserialize)]
#[serde(untagged)]
pub enum AuthRequestEntity {
    LogInRequest(LogInRequest),
    ValidateTokenRequest(ValidateTokenRequest),
}

#[derive(Serialize)]
pub struct LogInResponse {
    pub token: String,
}
