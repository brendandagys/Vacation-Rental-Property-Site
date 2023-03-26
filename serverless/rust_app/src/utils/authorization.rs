use bcrypt::{BcryptResult, DEFAULT_COST};
use jsonwebtoken::{DecodingKey, Validation};
use serde::Deserialize;
use std::env;

pub fn hash_password(password: String) -> BcryptResult<String> {
    let salt = env::var("AUTHORIZATION_HASH_SALT").unwrap();
    let salt_characters: Vec<u8> = salt.bytes().collect();

    if salt_characters.len() < 16 {
        return Err(bcrypt::BcryptError::InvalidSaltLen(salt_characters.len()));
    }

    let mut default_array: [u8; 16] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6];

    for (i, _) in default_array.clone().iter().enumerate() {
        default_array[i] = salt_characters[i];
    }

    match bcrypt::hash_with_salt(password, DEFAULT_COST, default_array) {
        Ok(hash) => Ok(hash.format_for_version(bcrypt::Version::TwoB)),
        Err(error) => Err(error),
    }
}

pub fn validate_token<'a, T: for<'de> Deserialize<'de>>(
    token: &str,
) -> Result<T, jsonwebtoken::errors::Error> {
    let jwt_secret = env::var("JWT_SECRET").unwrap();

    match jsonwebtoken::decode::<T>(
        token,
        &DecodingKey::from_secret(&jwt_secret.as_ref()),
        &Validation::default(), // &Validation::new(Algorithm::HS256)
    ) {
        Ok(token_data) => Ok(token_data.claims),
        Err(error) => Err(error),
    }
}
