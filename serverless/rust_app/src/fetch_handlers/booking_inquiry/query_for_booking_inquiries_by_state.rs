use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_booking_inquiries_by_state(
    client: dynamodb::Client,
    state: &str,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query::<types::booking_inquiry::BookingInquiry>(
        client,
        Some("GSI-1".into()),
        "#key1 = :value1 AND #key2 = :value2".to_string(),
        &[("#key1", "GSI-PK"), ("#key2", "GSI-SK")],
        vec![
            (":value1", AttributeValue::S("INQUIRY".into())),
            (":value2", AttributeValue::S(format!("{state}"))),
        ],
    )
    .await
}
