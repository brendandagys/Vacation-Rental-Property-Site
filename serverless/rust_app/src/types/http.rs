use lambda_http::aws_lambda_events::query_map::QueryMap;
use serde::Serialize;

#[derive(Serialize)]
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
            ApiResponseData::Single(data) => {
                let meta = ApiResponseMeta {
                    count: 1,
                    limit: None,
                };

                Self {
                    data: ApiResponseData::Single(data),
                    meta,
                }
            }
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
