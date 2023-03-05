use lambda_http::{http::StatusCode, service_fn, Body, Error, Request, Response};
mod types;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_http::run(service_fn(log_in)).await?;
    Ok(())
}

async fn log_in(request: Request) -> Result<Response<Body>, Error> {
    match request.body() {
        Body::Text(body) => match serde_json::from_str::<types::LogInRequest>(body) {
            Ok(body) => {
                println!("Body: {:?}", body);

                let email = body.email.unwrap_or("".into());
                let password = body.password.unwrap_or("".into());

                if email == "" || password == "" {
                    return Ok(Response::builder().status(StatusCode::BAD_REQUEST).body(
                        "Please provide both necessary parameters: `email` and `password`.".into(),
                    )?);
                }

                // println!("Password: {}", password);

                // let hash = hash_with_salt(
                //     &password,
                //     4,
                //     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
                // )?;
                // let hash_text = hash.format_for_version(bcrypt::Version::TwoB);

                let hash_text = "$2b$04$..CA.uOD/eaGAO./.eKC/O8aXLg5WXVlAFSpbcjnQfrwFIfoVoSI6";

                match bcrypt::verify(password, &hash_text) {
                    Ok(valid) => match valid {
                        true => Ok(Response::builder().body(
                            format!("Successfully logged in!! Hash: {}", hash_text).into(),
                        )?),
                        false => Ok(Response::builder()
                            .status(StatusCode::BAD_REQUEST)
                            .body("Invalid password".into())?),
                    },
                    Err(e) => {
                        println!("Error: {:?}", e);
                        return Ok(Response::builder()
                            .status(401)
                            .body("Incorrect password!".into())?);
                    }
                }
            }
            Err(e) => {
                println!("ERROR: {:?}", e);
                return Ok(Response::builder().status(StatusCode::BAD_REQUEST).body(
                    "Please provide both necessary parameters: `email` and `password`.".into(),
                )?);
            }
        },
        _ => {
            return Ok(Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body("Please provide a text body.".into())?);
        }
    }
}
