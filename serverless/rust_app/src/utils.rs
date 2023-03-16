use aws_sdk_dynamodb as dynamodb;
use lambda_http;
use std::env;

pub async fn get_dynamo_db_client() -> dynamodb::Client {
    println!("{:?}", env::var("DYNAMODB_ENDPOINT"));

    let config = aws_config::load_from_env().await;
    let local_config = dynamodb::config::Builder::from(&config)
        .endpoint_url(
            env::var("DYNAMODB_ENDPOINT").unwrap_or("http://docker.for.mac.localhost:8000".into()),
        )
        .build();

    dynamodb::Client::from_conf(local_config)
}

pub fn build_http_response(
    status_code: lambda_http::http::StatusCode,
    body_text: &str,
) -> lambda_http::Response<lambda_http::Body> {
    let body = lambda_http::Body::Text(body_text.into());
    match lambda_http::Response::builder()
        .status(status_code)
        .body(body)
    {
        Ok(response) => response,
        Err(error) => lambda_http::Response::builder()
            .status(lambda_http::http::StatusCode::INTERNAL_SERVER_ERROR)
            .body(lambda_http::Body::Text(format!("{error}")))
            .unwrap(),
    }
}
