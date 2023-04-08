use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use dynamodb::model::AttributeValue;
use lambda_http::http::StatusCode;

pub async fn batch_get_defaults(
    client: &dynamodb::Client,
    default_fors: Vec<types::default::DefaultFor>,
) -> Result<Vec<types::default::Default>, (StatusCode, String)> {
    utils::dynamo_db::batch_get_item::<types::default::Default>(
        client,
        Vec::from(
            default_fors
                .iter()
                .map(|default_for| {
                    (
                        AttributeValue::S("DEFAULT".into()),
                        AttributeValue::S(format!("{:?}", default_for)),
                    )
                })
                .collect::<Vec<(AttributeValue, AttributeValue)>>(),
        ),
    )
    .await
}
