use crate::{types, utils};

use aws_sdk_dynamodb as dynamodb;
use aws_sdk_dynamodb::model::AttributeValue;
use dynamodb::model::ReturnConsumedCapacity;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};
use serde::{Deserialize, Serialize};
use serde_dynamo::from_items;
use std::env;

pub async fn query<'a, T: Deserialize<'a> + Serialize + std::fmt::Debug>(
    client: &dynamodb::Client,
    index_name: Option<types::Index>,
    key_condition_expression: String,
    expression_attribute_names: &[(&str, &str)],
    expression_attribute_values: Vec<(&str, AttributeValue)>,
    limit: Option<i32>,
) -> Result<Vec<T>, (StatusCode, String)> {
    let mut builder = client
        .query()
        .table_name(env::var("TABLE_NAME").unwrap().to_string());

    if let Some(index_name) = index_name {
        builder = builder.index_name(index_name.to_string());
    }

    builder = builder.key_condition_expression(&key_condition_expression);

    for (key, value) in expression_attribute_names.to_vec() {
        builder = builder.expression_attribute_names(key, value);
    }

    for (key, value) in expression_attribute_values {
        builder = builder.expression_attribute_values(key, value);
    }

    if let Some(limit) = limit {
        builder = builder.limit(limit)
    }

    // Send the query to DynamoDB
    let result = match builder
        .return_consumed_capacity(ReturnConsumedCapacity::Indexes)
        .send()
        .await
    {
        Ok(result) => result,
        Err(error) => {
            return Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string()));
        }
    };

    // Get results, if any, from the response from DynamoDB
    let items = match result.items() {
        Some(items) => items,
        None => {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "Error obtaining DynamoDB items from query result!".into(),
            ))
        }
    }
    .clone()
    .to_vec();

    // Get typed entities, derived from the DynamoDB response
    let entities: Vec<T> = match from_items(items.clone()) {
        Ok(entities) => entities,
        Err(error) => {
            println!(
                "Error converting DynamoDB items: {:?} into known type.",
                items
            );
            return Err((StatusCode::INTERNAL_SERVER_ERROR, error.to_string()));
        }
    };

    Ok(entities)
}

pub async fn query_http<'a, T: Deserialize<'a> + Serialize + std::fmt::Debug + Clone>(
    client: &dynamodb::Client,
    querymap: QueryMap,
    index_name: Option<types::Index>,
    key_condition_expression: String,
    expression_attribute_names: &[(&str, &str)],
    expression_attribute_values: Vec<(&str, AttributeValue)>,
    singular: bool,
) -> Result<Response<Body>, Error> {
    let limit = match querymap.first("limit") {
        Some(limit) => match limit.parse::<i32>() {
            Ok(limit) => Some(limit),
            Err(_) => None, // Improper limit => fetch all records
        },
        None => None,
    };

    match query::<T>(
        client,
        index_name,
        key_condition_expression,
        expression_attribute_names,
        expression_attribute_values,
        limit,
    )
    .await
    {
        Ok(typed_entities) => {
            if typed_entities.len() == 0 {
                let data_type = if singular {
                    types::http::ApiResponseData::NoneSingular::<()>(())
                } else {
                    types::http::ApiResponseData::NoneMultiple(Vec::new())
                };
                return utils::http::send_response(
                    data_type,
                    Some(querymap),
                    limit,
                    Some(StatusCode::NOT_FOUND),
                );
            }

            utils::http::send_response(
                if singular {
                    let single_entity = typed_entities.first().unwrap().to_owned();
                    types::http::ApiResponseData::Single(single_entity)
                } else {
                    types::http::ApiResponseData::Multiple(typed_entities)
                },
                Some(querymap),
                limit,
                None,
            )
        }
        Err((status_code, message)) => utils::http::send_error(status_code, &message),
    }
}
