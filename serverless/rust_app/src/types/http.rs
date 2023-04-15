use lambda_http::aws_lambda_events::query_map::QueryMap;
use serde::Serialize;

#[derive(Serialize)]
#[serde(untagged)]
pub enum ApiResponseData<T> {
    Multiple(Vec<T>),
    Single(T),
}

#[derive(Serialize)]
struct ApiResponseMeta {
    count: usize,
    limit: Option<i32>, // Compatible with the type of the SDK's `query` builder method
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    data: ApiResponseData<T>,
    meta: ApiResponseMeta,
}

impl<T> ApiResponse<T> {
    pub fn new(data: ApiResponseData<T>, querymap: Option<QueryMap>, limit: Option<i32>) -> Self {
        match data {
            ApiResponseData::Single(data) => Self {
                data: ApiResponseData::Single(data),
                meta: ApiResponseMeta {
                    count: 1,
                    limit: None,
                },
            },
            ApiResponseData::Multiple(vec_data) => {
                let count = vec_data.len();

                Self {
                    data: ApiResponseData::Multiple(vec_data),
                    meta: ApiResponseMeta { count, limit },
                }
            }
        }
    }
}

#[derive(Serialize)]
pub struct ApiErrorResponse {
    message: String,
}

impl ApiErrorResponse {
    pub fn new(message: &str) -> Self {
        Self {
            message: message.into(),
        }
    }
}
