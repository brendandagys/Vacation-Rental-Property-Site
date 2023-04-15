mod get_content_by_content_id;
pub use get_content_by_content_id::{get_content_by_content_id, get_content_by_content_id_http};

mod query_for_all_content;
pub use query_for_all_content::query_for_all_content;

use crate::{types, utils::http::send_error};

use aws_sdk_dynamodb as dynamodb;
use lambda_http::{
    aws_lambda_events::query_map::QueryMap, http::StatusCode, Body, Error, Response,
};

pub async fn get(client: &dynamodb::Client, querymap: QueryMap) -> Result<Response<Body>, Error> {
    if let Some(content_id) = querymap.first("content_id") {
        let content_id = &match content_id {
            "Header" => types::content::ContentId::Header,
            "HeroImage" => types::content::ContentId::HeroImage,
            "Subheader" => types::content::ContentId::Subheader,
            "Description" => types::content::ContentId::Description,
            "Footer" => types::content::ContentId::Footer,
            _ => return send_error(StatusCode::BAD_REQUEST, "Invalid `content_id` provided."),
        };

        return get_content_by_content_id_http(client, content_id, querymap.clone()).await;
    }

    query_for_all_content(client, querymap).await
}
