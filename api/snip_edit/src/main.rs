use std::env;

use aws_lambda_events::encodings::Body;
use aws_lambda_events::event::apigw::{ApiGatewayProxyRequest, ApiGatewayProxyResponse};
use dotenv::dotenv;
use http::header::HeaderMap;
use lambda_runtime::{handler_fn, Context, Error};
use log::LevelFilter;
use postgrest::Postgrest;
use serde::{Deserialize, Serialize};
use serde_json::Value;
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

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Ord, PartialOrd, Eq)]
struct Snip {
    code: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    language: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    password: Option<String>,
}

pub(crate) async fn handler(
    event: ApiGatewayProxyRequest,
    _ctx: Context,
) -> Result<ApiGatewayProxyResponse, Error> {
    let mut response_headers: HeaderMap = HeaderMap::new();
    response_headers.insert("Content-Type", "application/json".parse().unwrap());

    if event.http_method.as_str() != "PATCH" {
        let resp = ApiGatewayProxyResponse {
            status_code: 400,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(
                r#"{ "statusCode": 400, "message": "Wrong HTTP method!" }"#.to_owned(),
            )),
            is_base64_encoded: Some(false),
        };
        return Ok(resp);
    }

    let snip_id: &str;
    let mut request_user_id: String = "".to_owned();
    let mut response_user_id: String = "".to_owned();

    let request_body: Value;

    match event.body {
        Some(value) => request_body = serde_json::from_str(&value)?,
        None => {
            let resp = ApiGatewayProxyResponse {
                status_code: 400,
                headers: response_headers,
                multi_value_headers: HeaderMap::new(),
                body: Some(Body::Text(
                    r#"{ "statusCode": 401, "message": "No body provided in request." }"#
                        .to_owned(),
                )),
                is_base64_encoded: Some(false),
            };
            return Ok(resp);
        }
    }

    match request_body["id"].as_str() {
        Some(value) => snip_id = value,
        None => {
            let resp = ApiGatewayProxyResponse {
                status_code: 400,
                headers: response_headers,
                multi_value_headers: HeaderMap::new(),
                body: Some(Body::Text(
                    r#"{ "statusCode": 400, "message": "Missing required body key [id]!" }"#
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
    let response_body_json: Value = serde_json::from_str(&body)?;

    if event.headers.contains_key("Authorization") {
        match event.headers["Authorization"].to_str() {
            Ok(value) => request_user_id = value.to_owned(),
            Err(error) => {
                println!("{}", error)
            }
        }
    } else {
        let resp = ApiGatewayProxyResponse {
            status_code: 400,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(
                r#"{ "statusCode": 400, "message": "Missing required header [Authorization]!" }"#
                    .to_owned(),
            )),
            is_base64_encoded: Some(false),
        };
        return Ok(resp);
    }

    if !request_user_id.contains("Bearer") {
        let resp = ApiGatewayProxyResponse {
            status_code: 401,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(
                r#"{ "statusCode": 401, "message": "Wrong authorization scheme" }"#.to_owned(),
            )),
            is_base64_encoded: Some(false),
        };
        return Ok(resp);
    } else {
        request_user_id = request_user_id.chars().skip("Bearer ".len()).collect();
    }

    match response_body_json[0]["user_id"].as_str() {
        Some(value) => {
            response_user_id = value.to_owned();
        }
        None => {}
    }

    if response_user_id.trim().is_empty() {
        let resp = ApiGatewayProxyResponse {
            status_code: 403,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(
                r#"{ "statusCode": 403, "message": "Paste is not editable as it is not associated with an account!" }"#.to_owned(),
            )),
            is_base64_encoded: Some(false),
        };

        return Ok(resp);
    }

    if response_user_id == request_user_id && !response_user_id.is_empty() {
        let mut edited_snip = Snip {
            code: "".to_owned(),
            language: None,
            password: None,
        };

        match request_body["code"].as_str() {
            Some(value) => edited_snip.code = value.to_owned(),
            None => edited_snip.code = response_body_json["code"].to_string(),
        }

        match request_body["language"].as_str() {
            Some(value) => edited_snip.language = Some(value.to_owned()),
            None => {}
        }

        match request_body["password"].as_str() {
            Some(value) => edited_snip.password = Some(value.to_owned()),
            None => {}
        }

        let edit_request = serde_json::to_string(&edited_snip)?;
        println!("{}", edit_request);

        let response = client
            .from("snips")
            .select("*")
            .eq("id", snip_id)
            .update(edit_request)
            .execute()
            .await?;

        let body = response.text().await?;

        let resp = ApiGatewayProxyResponse {
            status_code: 200,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(body)),
            is_base64_encoded: Some(false),
        };

        return Ok(resp);
    } else {
        let resp = ApiGatewayProxyResponse {
            status_code: 200,
            headers: response_headers,
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(
                r#"{ "statusCode": 401, "message": "Authorization token is invalid!" }"#.to_owned(),
            )),
            is_base64_encoded: Some(false),
        };
        Ok(resp)
    }
}
