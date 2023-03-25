use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_booking_inquiries_in_date_range(
    client: dynamodb::Client,
    (start_date, end_date): (&str, &str),
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query::<types::booking_inquiry::BookingInquiry>(
        client,
        None,
        "#key1 = :value1 AND #key2 BETWEEN :value2 AND :value3".to_string(),
        &[("#key1", "PK"), ("#key2", "SK")],
        vec![
            (":value1", AttributeValue::S("INQUIRY".into())),
            (":value2", AttributeValue::S(format!("{start_date}"))),
            (":value3", AttributeValue::S(format!("{end_date}"))),
        ],
    )
    .await
}
