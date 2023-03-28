use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_testimonials_by_active_and_date_range(
    client: &dynamodb::Client,
    active: bool,
    (start_date, end_date): (&str, &str),
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query::<types::testimonial::Testimonial>(
        client,
        None,
        "#field1 = :value1 AND #field2 BETWEEN :value2 AND :value3".to_string(),
        &[("#field1", "PK"), ("#field2", "SK")],
        vec![
            (
                ":value1",
                AttributeValue::S(format!(
                    "TESTIMONIAL-{}",
                    if active { "ACTIVE" } else { "INACTIVE" }
                )),
            ),
            (":value2", AttributeValue::S(start_date.into())),
            (":value3", AttributeValue::S(end_date.into())),
        ],
    )
    .await
}
