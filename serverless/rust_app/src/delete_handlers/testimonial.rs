use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::types::AttributeValue;
use lambda_http::{http::StatusCode, Body, Error};
use std::env;

pub async fn delete_testimonial(
    client: &dynamodb::Client,
    delete_request: types::testimonial::TestimonialDeleteRequest,
) -> Result<lambda_http::Response<Body>, Error> {
    let table_name = env::var("TABLE_NAME").unwrap_or_default();

    if table_name.is_empty() {
        return utils::http::send_error(
            StatusCode::INTERNAL_SERVER_ERROR,
            "TABLE_NAME not configured",
        );
    }

    let pk = delete_request.primary_key.clone();
    let sk = delete_request.sort_key.clone();

    // First, verify that the testimonial exists and is inactive
    let existing = match utils::dynamo_db::get_item::<types::testimonial::Testimonial>(
        client,
        AttributeValue::S(pk.clone()),
        AttributeValue::S(sk.clone()),
    )
    .await
    {
        Ok(item) => item,
        Err((status, msg)) => {
            if status == StatusCode::NOT_FOUND {
                return utils::http::send_error(StatusCode::NOT_FOUND, "Testimonial not found");
            }
            return utils::http::send_error(status, &msg);
        }
    };

    // Only allow deletion of inactive testimonials
    if existing.active {
        return utils::http::send_error(
            StatusCode::BAD_REQUEST,
            "Cannot delete active testimonials. Please deactivate the testimonial first.",
        );
    }

    // Delete the item
    let delete_result = client
        .delete_item()
        .table_name(table_name)
        .key("PK", AttributeValue::S(pk))
        .key("SK", AttributeValue::S(sk))
        .send()
        .await;

    match delete_result {
        Ok(_) => utils::http::send_response(
            types::http::ApiResponseData::Single("Testimonial deleted successfully".to_string()),
            None,
            None,
            None,
        ),
        Err(err) => {
            utils::http::send_error(StatusCode::INTERNAL_SERVER_ERROR, &err.to_string())
        }
    }
}
