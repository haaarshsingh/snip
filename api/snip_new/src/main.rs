use aws_lambda_events::encodings::Body;
use aws_lambda_events::event::apigw::{ApiGatewayProxyRequest, ApiGatewayProxyResponse};
use dotenv::dotenv;
use http::header::HeaderMap;
use lambda_runtime::{handler_fn, Context, Error};
use log::LevelFilter;
use nanoid::nanoid;
use postgrest::Postgrest;
use serde_json::Value;
use simple_logger::SimpleLogger;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new()
        .with_level(LevelFilter::Info)
        .init()
        .unwrap();
    dotenv().ok();

    let func = handler_fn(my_handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

struct Snip {
    id: String,
    code: &str,
    language: &str,
    password: &str,
}

pub(crate) async fn my_handler(
    event: ApiGatewayProxyRequest,
    _ctx: Context,
) -> Result<ApiGatewayProxyResponse, Error> {
    let mut response_headers: HeaderMap = HeaderMap::new();
    response_headers.insert("Content-Type", "application/json".parse().unwrap());

    let request_body: Value;
    let mut snip: Snip = Snip {
        id: nanoid!(10),
        code: (),
        language: (),
        password: (),
    };

    let language: String;

    let client = Postgrest::new("https://araasnleificjyjflqml.supabase.co/rest/v1/")
        .insert_header("apikey", &env::var("SUPABASE_PUBLIC_ANON_KEY").unwrap());

    match event.body {
        Some(value) => request_body = serde_json::from_str(&value)?,
        None => {
            let resp = ApiGatewayProxyResponse {
                status_code: 400,
                headers: response_headers,
                multi_value_headers: HeaderMap::new(),
                body: Some(Body::Text(
                    r#"{ "statusCode": 400, "message": "No body provided in request." }"#
                        .to_owned(),
                )),
                is_base64_encoded: Some(false),
            };
            return Ok(resp);
        }
    }

    if !request_body["id"].is_null() {
        match request_body["id"].as_str() {
            Some(value) => {
                snip.id = value.to_owned();
            }
            None => todo!("id does not contain value"),
        }
    }
    if let Some(value) = request_body["code"].as_str() {
        snip.code = value;
    } else {
        let resp = ApiGatewayProxyResponse {
            status_code: 400,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(
                r#"{ "statusCode": 400, "message": "Missing required key in body [code]!" }"#
                    .to_owned(),
            )),
            is_base64_encoded: Some(false),
        };
        return Ok(resp);
    }

    match request_body["language"].as_str() {
        Some(value) => snip.language = value,
        None => snip.language = "",
    }

    print!("{}", serde_json::to_string(&snip));

    let resp = client
        .from("snips")
        .insert(serde_json::to_string(&snip)?)
        .execute()
        .await?;

    let body = resp.text().await?;

    let resp = ApiGatewayProxyResponse {
        status_code: 200,
        headers: response_headers,
        multi_value_headers: HeaderMap::new(),
        body: Some(Body::Text(body)),
        is_base64_encoded: Some(false),
    };
    Ok(resp)
}
