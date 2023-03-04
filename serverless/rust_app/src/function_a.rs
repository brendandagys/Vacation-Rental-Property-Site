use bcrypt::{hash_with_salt, verify};
use lambda_http::{service_fn, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(|request: Request| login(request))).await?;
    Ok(())
}

async fn login(request: Request) -> Result<Response<Body>, Error> {
    println!("Login() received the following request: {:?}", request);

    let hash = hash_with_salt(
        "password",
        4,
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    )?;

    let hash_text = hash.format_for_version(bcrypt::Version::TwoB);

    println!("Hash is: {}", hash_text);

    match verify("password", &hash_text) {
        Err(e) => {
            println!("Error: {:?}", e);
            return Ok(Response::builder()
                .status(401)
                .body("Incorrect password!".into())?);
        }
        _ => {}
    };

    Ok(Response::builder()
        .status(200)
        .body(format!("Successfully logged in! Hash: {}", hash_text).into())?)
}
