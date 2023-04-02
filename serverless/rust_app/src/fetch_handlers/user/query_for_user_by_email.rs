use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn query_for_user_by_email(
    client: &dynamodb::Client,
    email: &str,
    querymap: QueryMap,
) -> Result<Response<Body>, Error> {
    utils::dynamo_db::query_http::<types::user::User>(
        client,
        Some("GSI-1".to_string()),
        "#key1 = :value1 AND #key2 = :value2".to_string(),
        &[("#key1", "GSI-PK"), ("#key2", "GSI-SK")],
        vec![
            (":value1", AttributeValue::S("USER".into())),
            (":value2", AttributeValue::S(format!("{email}"))),
        ],
    )
    .await
}
