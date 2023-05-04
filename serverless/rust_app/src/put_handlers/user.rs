use std::env;

use crate::{
    fetch_handlers,
    types::{self, BuildFunction},
    utils,
};

use aws_sdk_dynamodb as dynamodb;
use chrono::{DateTime, Utc};
use dynamodb::{operation::put_item::builders::PutItemFluentBuilder, types::AttributeValue};
use lambda_http::{http::StatusCode, Body, Error};

pub fn build_user_item(
    builder: PutItemFluentBuilder,
    user: types::user::UserPutRequest,
    now: DateTime<Utc>,
) -> PutItemFluentBuilder {
    let types::user::UserPutRequest {
        username,
        email,
        password,
        first,
        last,
        administrator,
        phone,
    } = user;

    let no_whitespace_password = password.replace(" ", "");

    let salt = env::var("HASH_SALT").expect("Hash salt not set! Use `HASH_SALT`.");

    let hash =
        utils::auth::hash_password(no_whitespace_password, salt).expect("Could not hash password!");

    builder
        .item("PK", AttributeValue::S(format!("USER-{username}")))
        .item("SK", AttributeValue::S("USER-INFO".into()))
        .item("GSI-PK", AttributeValue::S("USER".into()))
        .item("GSI-SK", AttributeValue::S(email.clone()))
        .item("username", AttributeValue::S(username))
        .item("email", AttributeValue::S(email))
        .item("hash", AttributeValue::S(hash))
        .item("first", AttributeValue::S(first))
        .item("last", AttributeValue::S(last))
        .item("administrator", AttributeValue::Bool(administrator))
        .item("phone", AttributeValue::S(phone))
        .item("created", AttributeValue::S(now.to_string()))
}

struct BuildUser {}

impl BuildFunction<PutItemFluentBuilder, types::user::UserPutRequest> for BuildUser {
    fn build_item(
        &self,
        builder: PutItemFluentBuilder,
        user_put_request: types::user::UserPutRequest,
        now: DateTime<Utc>,
    ) -> PutItemFluentBuilder {
        build_user_item(builder, user_put_request, now)
    }
}

pub async fn put_user(
    client: &dynamodb::Client,
    user: types::user::UserPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::user::UserPutRequest {
        username,
        email,
        password,
        first,
        last,
        phone,
        ..
    } = &user;

    let no_whitespace_password = password.replace(" ", "");

    if no_whitespace_password.len() < 7 {
        return utils::http::send_error(
            StatusCode::BAD_REQUEST,
            "Password must be at least seven characters, with no whitespace.",
        );
    }

    let existing_user_with_username =
        fetch_handlers::user::get_user_by_username(client, username).await;

    let mut existing_user_with_email = true;

    match fetch_handlers::user::query_for_user_by_email(client, email).await {
        Ok(email_vector) => {
            if email_vector.len() == 0 {
                existing_user_with_email = false;
            }
        }
        Err((status_code, message)) => return utils::http::send_error(status_code, &message),
    };

    if existing_user_with_email || existing_user_with_username.is_ok() {
        return utils::http::send_error(StatusCode::BAD_REQUEST, "User already exists.");
    }

    let salt = match env::var("HASH_SALT") {
        Ok(secret) => secret,
        Err(_) => {
            return utils::http::send_error(
                StatusCode::INTERNAL_SERVER_ERROR,
                "Hash salt not set! Use `HASH_SALT`.",
            )
        }
    };

    match utils::auth::hash_password(no_whitespace_password.clone(), salt) {
        Ok(_) => {}
        Err(error) => {
            return utils::http::send_error(
                StatusCode::BAD_REQUEST,
                &format!("Unable to hash provided password. ERROR: {error}"),
            )
        }
    };

    if username.trim() == ""
        || email.trim() == ""
        || no_whitespace_password == ""
        || first.trim() == ""
        || last.trim() == ""
        || phone.trim() == ""
    {
        return utils::http::send_error(StatusCode::BAD_REQUEST, "Please provide all fields.");
    }

    let user_builder = BuildUser {};

    utils::dynamo_db::put_item_http::<types::user::UserPutRequest>(client, user_builder, user).await
}
