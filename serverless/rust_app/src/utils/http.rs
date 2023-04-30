use crate::{types, utils};
use std::env;

use lambda_http::{
    aws_lambda_events::query_map::QueryMap,
    http::{response::Builder, StatusCode},
    Body, Error, Response,
};

const DEFAULT_CORS_ORIGIN: &str = "*";
const DEFAULT_CORS_METHODS: &str = "OPTIONS, GET, POST, PUT";
const DEFAULT_CORS_HEADERS: &str = "Content-Type, Authorization, X-Forwarded-For";

fn add_cors_headers_to_response(response_builder: Builder) -> Builder {
    let origin = env::var("CORS_ORIGIN").unwrap_or(DEFAULT_CORS_ORIGIN.into());
    let methods = env::var("CORS_METHODS").unwrap_or(DEFAULT_CORS_METHODS.into());
    let headers = env::var("CORS_HEADERS").unwrap_or(DEFAULT_CORS_HEADERS.into());
    // println!("CORS origin: {origin} | CORS methods: {methods} | CORS headers: {headers}");

    response_builder
        .header("Access-Control-Allow-Origin", origin)
        .header("Access-Control-Allow-Methods", methods)
        .header("Access-Control-Allow-Headers", headers)
}

pub fn build_http_response(status_code: StatusCode, body_text: &str) -> Response<Body> {
    let body = Body::Text(body_text.into());
    match add_cors_headers_to_response(Response::builder())
        .status(status_code)
        .body(body)
    {
        Ok(response) => response,
        Err(error) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::Text(format!("{error}")))
            .unwrap(),
    }
}

pub fn send_response<T: serde::Serialize>(
    data: types::http::ApiResponseData<T>,
    querymap: Option<QueryMap>,
    limit: Option<i32>,
    status_code: Option<StatusCode>,
) -> Result<Response<Body>, Error> {
    let api_response = types::http::ApiResponse::new(data, querymap, limit);

    match serde_json::to_string(&api_response) {
        Ok(string) => Ok(utils::http::build_http_response(
            status_code.unwrap_or(StatusCode::OK),
            &string,
        )),
        Err(error) => {
            println!("Error converting response data into a JSON string: {error}");
            utils::http::send_error(StatusCode::INTERNAL_SERVER_ERROR, &error.to_string())
        }
    }
}

pub fn send_error(status_code: StatusCode, message: &str) -> Result<Response<Body>, Error> {
    let error_response = types::http::ApiErrorResponse::new(message);

    match serde_json::to_string(&error_response) {
        Ok(string) => Ok(utils::http::build_http_response(status_code, &string)),
        Err(error) => {
            println!("Error converting response data into a JSON string: {error}");
            utils::http::send_error(StatusCode::INTERNAL_SERVER_ERROR, &format!("{error}"))
        }
    }
}
