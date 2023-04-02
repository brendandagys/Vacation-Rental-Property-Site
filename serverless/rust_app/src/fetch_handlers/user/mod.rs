mod get_user_by_username;
use get_user_by_username::get_user_by_username;

mod query_for_user_by_email;
use query_for_user_by_email::query_for_user_by_email;

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
            return Ok(utils::http::build_http_response(
                StatusCode::UNAUTHORIZED,
                "No `Authorization` header provided.",
            ))
        }
    };

    match utils::authorization::validate_token::<types::log_in::JwtClaims>(token.to_str().unwrap())
    {
        Ok(_) => {}
        Err(error) => {
            println!("Error validating token: {error}");
            return Ok(utils::http::build_http_response(
                StatusCode::UNAUTHORIZED,
                "Invalid token.",
            ));
        }
    };

    if let Some(username) = querymap.first("username") {
        return get_user_by_username(client, username, querymap.clone()).await;
    }

    if let Some(email) = querymap.first("email") {
        return query_for_user_by_email(client, email, querymap.clone()).await;
    }

    query_for_all_users(client, querymap).await
}
