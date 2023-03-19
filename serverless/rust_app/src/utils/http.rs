use lambda_http::{http::StatusCode, Body, Response};

pub fn build_http_response(status_code: StatusCode, body_text: &str) -> Response<Body> {
    let body = Body::Text(body_text.into());
    match Response::builder().status(status_code).body(body) {
        Ok(response) => response,
        Err(error) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::Text(format!("{error}")))
            .unwrap(),
    }
}
