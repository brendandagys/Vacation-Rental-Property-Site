use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use chrono::Utc;
use dynamodb::model::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn put_booking_inquiry(
    client: dynamodb::Client,
    booking_inquiry: types::booking_inquiry::BookingInquiryPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::booking_inquiry::BookingInquiryPutRequest {
        state,
        email,
        from_to,
        last,
        first,
        phone,
        subtotal,
        adult_count,
        child_count,
        message,
    } = booking_inquiry;

    if email.trim() == "" || message.trim() == "" {
        return Ok(utils::http::build_http_response(
            StatusCode::BAD_REQUEST,
            "Please provide all fields.",
        ));
    }

    let ensure_state = state.unwrap_or(types::booking_inquiry::BookingInquiryState::New);

    let now = Utc::now();

    let mut builder = client
        .put_item()
        .table_name(env::var("TABLE_NAME").unwrap().to_string())
        .item("PK", AttributeValue::S("INQUIRY".into()))
        .item("SK", AttributeValue::S(now.to_string()))
        .item("GSI-PK", AttributeValue::S("INQUIRY".into()))
        .item("GSI-SK", AttributeValue::S(format!("{:?}", ensure_state)))
        .item("state", AttributeValue::S(format!("{:?}", ensure_state)))
        .item("email", AttributeValue::S(email));

    builder = utils::dynamo_db::append_string_item_if_exists(builder, "from_to", from_to);
    builder = utils::dynamo_db::append_string_item_if_exists(builder, "last", last);
    builder = utils::dynamo_db::append_string_item_if_exists(builder, "first", first);
    builder = utils::dynamo_db::append_string_item_if_exists(builder, "phone", phone);
    builder = utils::dynamo_db::append_string_item_if_exists(builder, "subtotal", subtotal);
    builder = utils::dynamo_db::append_u8_item_if_exists(builder, "adult_count", adult_count);
    builder = utils::dynamo_db::append_u8_item_if_exists(builder, "child_count", child_count);
    builder = builder.item("message", AttributeValue::S(message));
    builder = builder.item("created", AttributeValue::S(now.to_string()));

    utils::dynamo_db::send_and_handle_put_item_request(builder, now).await
}
