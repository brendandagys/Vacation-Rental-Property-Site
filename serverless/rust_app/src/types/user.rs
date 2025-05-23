use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct User {
    #[serde(rename = "PK")]
    pub primary_key: String,
    #[serde(rename = "SK")]
    pub sort_key: String,
    #[serde(rename = "GSI-PK")]
    pub gsi_primary_key: String,
    #[serde(rename = "GSI-SK")]
    pub gsi_sort_key: String,
    pub username: String,
    pub email: String,
    pub hash: String,
    pub first: String,
    pub last: String,
    pub administrator: bool,
    pub phone: String,
    pub last_login: Option<String>,
    pub created: String,
    pub modified: Option<String>,
}

#[derive(Deserialize)]
pub struct UserPutRequest {
    pub username: String,
    pub email: String,
    pub password: String,
    pub first: String,
    pub last: String,
    pub administrator: bool,
    pub phone: String,
}
