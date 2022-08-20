use aws_lambda_events::encodings::Body;
use aws_lambda_events::event::apigw::{ApiGatewayProxyRequest, ApiGatewayProxyResponse};
use http::header::HeaderMap;
use lambda_runtime::{handler_fn, Context, Error};
use postgrest::Postgrest;
use dotenv::dotenv;
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

    let func = handler_fn(my_handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

pub(crate) async fn my_handler(
    event: ApiGatewayProxyRequest,
    _ctx: Context,
) -> Result<ApiGatewayProxyResponse, Error> {

    let snip_id;

    let mut request_user_id : &str = "";
    let mut snip_user_id : &str = "";

    match event.query_string_parameters.first("id") {
        Some(value) => { snip_id = value }
        None => {
            let resp = ApiGatewayProxyResponse {
                status_code: 400,
                headers: HeaderMap::new(),
                multi_value_headers: HeaderMap::new(),
                body: Some(Body::Text(r#"{ "statusCode": 400, "message": "Missing required query parameter [id]!" }"#.to_owned())),
                is_base64_encoded: Some(false),
            };
            return Ok(resp)
        }
    }

    let client = Postgrest::new("https://araasnleificjyjflqml.supabase.co/rest/v1/")
    .insert_header("apikey", &env::var("SUPABASE_PUBLIC_ANON_KEY").unwrap());

    let resp = client.from("snips")
    .select("*")
    .eq("id", snip_id)
    .execute().await?;

    let body = resp.text().await?;
    let body_json: Value = serde_json::from_str(&body)?;
    
    if event.headers.contains_key("Authorization")
    {
        match event.headers["Authorization"].to_str() {
            Ok(value) => { request_user_id = value }
            Err(error) => { 
                println!("{}", error)
        } 
    }
    } else {
        let resp = ApiGatewayProxyResponse {
            status_code: 400,
            headers: HeaderMap::new(),
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(r#"{ "statusCode": 400, "message": "Missing required header [Authorization]!" }"#.to_owned())),
            is_base64_encoded: Some(false),
        };
        return Ok(resp)
    }
       
    match body_json[0]["user_id"].as_str() {
        Some(value) => { snip_user_id = value; },
        None => {},
    }

    //todo: [VERY DANGEROUS] still need to handle if both snip_user_id and request_user_id are value "empty", 
    // the case will still go through and delete the snip.
    if snip_user_id.is_empty()
    {
        let resp = ApiGatewayProxyResponse {
            status_code: 403,
            headers: HeaderMap::new(),
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(r#"{ "statusCode": 403, "message": "Paste is not deleteable as it is not associated with an account!" }"#.to_owned())),
            is_base64_encoded: Some(false),
        };

        return Ok(resp)
    }    

    if snip_user_id == request_user_id {
        let resp = client.from("snips")
        .select("*")
        .eq("id", snip_id)
        .delete()
        .execute().await?;
    }

    let resp = ApiGatewayProxyResponse {
            status_code: 200,
            headers: HeaderMap::new(),
            multi_value_headers: HeaderMap::new(),
            body: Some(Body::Text(body)),
            is_base64_encoded: Some(false),
    };

    Ok(resp)
}