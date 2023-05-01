use aws_sdk_sns as sns;

pub async fn get_sns_client() -> sns::Client {
    let config = aws_config::load_from_env().await;
    sns::Client::new(&config)
}
