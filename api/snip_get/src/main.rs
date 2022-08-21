use aws_lambda_events::encodings::Body;
use aws_lambda_events::event::apigw::{ApiGatewayProxyRequest, ApiGatewayProxyResponse};
use dotenv::dotenv;
use http::header::HeaderMap;
use lambda_runtime::{handler_fn, Context, Error};
use postgrest::Postgrest;
use serde_json::Value;
use std::env;

use log::LevelFilter;
use simple_logger::SimpleLogger;

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new()
        .with_level(LevelFilter::Info)
        .init()
        .unwrap();
    dotenv().ok();

    let func = handler_fn(handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

pub(crate) async fn handler(
    event: ApiGatewayProxyRequest,
    _ctx: Context,
) -> Result<ApiGatewayProxyResponse, Error> {
    let mut response_headers: HeaderMap = HeaderMap::new();
    response_headers.insert("Content-Type", "application/json".parse().unwrap());

    let snip_id;

    match event.query_string_parameters.first("id") {
        Some(value) => snip_id = value,
        None => {
            let resp = ApiGatewayProxyResponse {
                status_code: 400,
                headers: response_headers,
                multi_value_headers: HeaderMap::new(),
                body: Some(Body::Text(
                    r#"{ "statusCode": 400, "message": "Missing required query parameter [id]!" }"#
                        .to_owned(),
                )),
                is_base64_encoded: Some(false),
            };
            return Ok(resp);
        }
    }

    let client = Postgrest::new("https://araasnleificjyjflqml.supabase.co/rest/v1/")
        .insert_header("apikey", &env::var("SUPABASE_PUBLIC_ANON_KEY").unwrap());

    let resp = client
        .from("snips")
        .select("*")
        .eq("id", snip_id)
        .execute()
        .await?;

    let body = resp.text().await?;
    let body_json: Value = serde_json::from_str(&body)?;

    if !body_json[0]["password"].is_null() {
        if event.headers.contains_key("Password") {
            match event.headers["Password"].to_str() {
                Ok(value) => {
                    if value != body_json[0]["password"] {
                        let resp = ApiGatewayProxyResponse {
                            status_code: 401,
                            headers: response_headers,
                            multi_value_headers: HeaderMap::new(),
                            body: Some(Body::Text(
                                r#"{ "statusCode": 401, "message": "Incorrect Password header provided!" }"#
                                    .to_owned(),
                            )),
                            is_base64_encoded: Some(false),
                        };
                        return Ok(resp);
                    }
                }
                Err(_) => println!("Password header is invalid."),
            }
        } else {
            let resp = ApiGatewayProxyResponse {
                status_code: 401,
                headers: response_headers,
                multi_value_headers: HeaderMap::new(),
                body: Some(Body::Text(
                    r#"{ "statusCode": 401, "message": "No Password header!" }"#.to_owned(),
                )),
                is_base64_encoded: Some(false),
            };

            return Ok(resp);
        }
    }

    let mut response_header: HeaderMap = HeaderMap::new();
    response_header.insert("Content-Type", "application/json".parse().unwrap());

    let resp = ApiGatewayProxyResponse {
        status_code: 200,
        headers: response_header,
        multi_value_headers: HeaderMap::new(),
        body: Some(Body::Text(body)),
        is_base64_encoded: Some(false),
    };

    Ok(resp)
}
