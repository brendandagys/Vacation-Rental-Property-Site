use std::env;

use crate::{
    types::{self, BuildFunction},
    utils,
};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::{operation::put_item::builders::PutItemFluentBuilder, types::AttributeValue};

use chrono::{DateTime, Utc};
use lambda_http::{http::StatusCode, Body, Error};

pub fn build_booking_inquiry_item(
    mut builder: PutItemFluentBuilder,
    booking_inquiry: types::booking_inquiry::BookingInquiryPutRequest,
    now: DateTime<Utc>,
) -> PutItemFluentBuilder {
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

    let ensure_state = state.unwrap_or(types::booking_inquiry::BookingInquiryState::New);

    builder = builder
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

    builder
}

struct BuildBookingInquiry {}

impl BuildFunction<PutItemFluentBuilder, types::booking_inquiry::BookingInquiryPutRequest>
    for BuildBookingInquiry
{
    fn build_item(
        &self,
        builder: PutItemFluentBuilder,
        booking_inquiry_put_request: types::booking_inquiry::BookingInquiryPutRequest,
        now: DateTime<Utc>,
    ) -> PutItemFluentBuilder {
        build_booking_inquiry_item(builder, booking_inquiry_put_request, now)
    }
}

pub async fn put_booking_inquiry(
    client: &dynamodb::Client,
    booking_inquiry: types::booking_inquiry::BookingInquiryPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::booking_inquiry::BookingInquiryPutRequest { email, message, .. } = &booking_inquiry;

    if email.trim() == "" || message.trim() == "" {
        return utils::http::send_error(StatusCode::BAD_REQUEST, "Please provide all fields.");
    }

    let booking_inquiry_builder = BuildBookingInquiry {};

    let topic_arn = env::var("SNS_TOPIC_ARN").unwrap_or("".into());

    if topic_arn != "" {
        let message = serde_json::to_string(&booking_inquiry)?;
        println!("SNS Topic ARN: {:?} | Message: {:?}", topic_arn, message);

        utils::sns::get_sns_client()
            .await
            .publish()
            .topic_arn(topic_arn)
            .message(message)
            .send()
            .await?;
    }

    utils::dynamo_db::put_item_http::<types::booking_inquiry::BookingInquiryPutRequest>(
        client,
        booking_inquiry_builder,
        booking_inquiry,
    )
    .await
}
