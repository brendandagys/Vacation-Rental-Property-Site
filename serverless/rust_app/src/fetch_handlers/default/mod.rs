mod query_for_all_defaults;
pub use query_for_all_defaults::query_for_all_defaults;

mod get_default_by_name;
pub use get_default_by_name::get_default_by_name;

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{aws_lambda_events::query_map::QueryMap, Body, Error, Response};

pub async fn get(client: &dynamodb::Client, querymap: QueryMap) -> Result<Response<Body>, Error> {
    if let Some(name) = querymap.first("name") {
        return get_default_by_name(client, name, querymap.clone()).await;
    }

    query_for_all_defaults(client, querymap).await
}
