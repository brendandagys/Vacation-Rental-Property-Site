mod get_user_by_username;
pub use get_user_by_username::get_user_by_username;
use get_user_by_username::get_user_by_username_http;

mod query_for_user_by_email;
pub use query_for_user_by_email::query_for_user_by_email;
use query_for_user_by_email::query_for_user_by_email_http;

mod query_for_all_users;
use query_for_all_users::query_for_all_users;

use crate::{types, utils};
use aws_sdk_dynamodb as dynamodb;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap,
    http::{HeaderMap, HeaderValue, StatusCode},
    Body, Error, Response,
};

pub async fn get(
    client: &dynamodb::Client,
    headers: &HeaderMap<HeaderValue>,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    let token = match headers.get("Authorization") {
        Some(token) => token,
        None => {
            return utils::http::send_error(
                StatusCode::UNAUTHORIZED,
                "No `Authorization` header provided.",
            )
        }
    };

    match utils::auth::validate_token::<types::auth::JwtClaims>(token.to_str().unwrap()) {
        Ok(_) => {}
        Err(error) => {
            println!("Error validating token: {error}");
            return utils::http::send_error(StatusCode::UNAUTHORIZED, "Invalid token.");
        }
    };

    if let Some(username) = querymap.first("username") {
        return get_user_by_username_http(client, username, querymap.clone()).await;
    }

    if let Some(email) = querymap.first("email") {
        return query_for_user_by_email_http(client, email, querymap.clone()).await;
    }

    query_for_all_users(client, querymap).await
}
