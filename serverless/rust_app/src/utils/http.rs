use crate::{types, utils};

use lambda_http::{
    aws_lambda_events::query_map::QueryMap,
    http::{response::Builder, StatusCode},
    Body, Error, Response,
};

const ORIGIN: &str = "http://localhost:3001";
const METHODS: &str = "OPTIONS, GET, POST, PUT";
const HEADERS: &str = "Content-Type, Authorization";

fn add_cors_headers_to_response(response_builder: Builder) -> Builder {
    response_builder
        .header("Access-Control-Allow-Origin", ORIGIN)
        .header("Access-Control-Allow-Methods", METHODS)
        .header("Access-Control-Allow-Headers", HEADERS)
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

pub fn build_cors_response() -> Response<Body> {
    add_cors_headers_to_response(Response::builder())
        .body(Body::Text("Welcome!".into()))
        .unwrap()
}

pub fn send_response<T: serde::Serialize>(
    data: types::http::ApiResponseData<T>,
    querymap: Option<QueryMap>,
    limit: Option<i32>,
) -> Result<Response<Body>, Error> {
    let api_response = types::http::ApiResponse::new(data, querymap, limit);

    match serde_json::to_string(&api_response) {
        Ok(string) => Ok(utils::http::build_http_response(StatusCode::OK, &string)),
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
