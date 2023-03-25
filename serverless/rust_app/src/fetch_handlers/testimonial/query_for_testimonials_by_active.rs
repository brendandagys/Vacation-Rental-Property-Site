use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_testimonials_by_active(
    client: dynamodb::Client,
    active: bool,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query::<types::testimonial::Testimonial>(
        client,
        None,
        "#field = :value".to_string(),
        &[("#field", "PK")],
        vec![(
            ":value",
            AttributeValue::S(format!(
                "TESTIMONIAL-{}",
                if active { "ACTIVE" } else { "INACTIVE" }
            )),
        )],
    )
    .await
}
