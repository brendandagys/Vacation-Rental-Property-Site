use lambda_http::{service_fn, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(|request: Request| logout(request))).await?;
    Ok(())
}

async fn logout(request: Request) -> Result<Response<Body>, Error> {
    println!("Logout() received the following request: {:?}", request);

    Ok(Response::builder()
        .status(200)
        .body("Successfully logged out!".into())?)
}
