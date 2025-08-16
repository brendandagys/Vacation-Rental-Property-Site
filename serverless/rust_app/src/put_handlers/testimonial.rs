use std::env;

use crate::{
    types::{self, BuildFunction},
    utils,
};

use aws_sdk_dynamodb as dynamodb;
use aws_sdk_sns as sns;
use chrono::{DateTime, Utc};
use dynamodb::{operation::put_item::builders::PutItemFluentBuilder, types::AttributeValue};
use lambda_http::{http::StatusCode, Body, Error};

pub fn build_testimonial_item(
    builder: PutItemFluentBuilder,
    testimonial: types::testimonial::TestimonialPutRequest,
    now: DateTime<Utc>,
) -> PutItemFluentBuilder {
    let types::testimonial::TestimonialPutRequest {
        name,
        stars,
        title,
        comment,
        active,
    } = testimonial;

    let stars_num = utils::miscellaneous::get_stars_number(stars);

    builder
        .item(
            "PK",
            AttributeValue::S(format!(
                "TESTIMONIAL-{}",
                if active { "ACTIVE" } else { "INACTIVE" }
            )),
        )
        .item("SK", AttributeValue::S(now.to_string()))
        .item("GSI-PK", AttributeValue::S("TESTIMONIAL".into()))
        .item("GSI-SK", AttributeValue::S(stars_num.to_string()))
        .item("name", AttributeValue::S(name))
        .item("stars", AttributeValue::N(stars_num.to_string()))
        .item("title", AttributeValue::S(title))
        .item("comment", AttributeValue::S(comment))
        .item("active", AttributeValue::Bool(active))
        .item("created", AttributeValue::S(now.to_string()))
}

struct BuildTestimonial {}

impl BuildFunction<PutItemFluentBuilder, types::testimonial::TestimonialPutRequest>
    for BuildTestimonial
{
    fn build_item(
        &self,
        builder: PutItemFluentBuilder,
        testimonial_put_request: types::testimonial::TestimonialPutRequest,
        now: DateTime<Utc>,
    ) -> PutItemFluentBuilder {
        build_testimonial_item(builder, testimonial_put_request, now)
    }
}

pub async fn put_testimonial(
    client: &dynamodb::Client,
    testimonial: types::testimonial::TestimonialPutRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let types::testimonial::TestimonialPutRequest {
        name,
        title,
        comment,
        ..
    } = &testimonial;

    if name.trim() == "" || title.trim() == "" || comment.trim() == "" {
        return utils::http::send_error(StatusCode::BAD_REQUEST, "Please provide all fields.");
    }

    let testimonial_builder = BuildTestimonial {};

    let topic_arn = env::var("SNS_TOPIC_ARN").unwrap_or("".into());

    if topic_arn != "" {
        let message = serde_json::to_string(&testimonial)?;

        match utils::sns::get_sns_client()
            .await
            .publish()
            .topic_arn(&topic_arn)
            .message(&message)
            .send()
            .await
        {
            Ok(res) => {
                println!(
                    "Published message (ID: {:?}) to SNS Topic ARN: {:?} | MESSAGE: {:?}",
                    res.message_id(),
                    topic_arn,
                    message
                )
            }
            Err(error) => match error {
                sns::error::SdkError::ServiceError(service_error) => {
                    println!("SNS ServiceError: {:?}", service_error);
                }
                _ => {
                    println!("SdkError<PublishError>: {error}");
                }
            },
        };
    }

    utils::dynamo_db::put_item_http::<types::testimonial::TestimonialPutRequest>(
        client,
        testimonial_builder,
        testimonial,
    )
    .await
}
