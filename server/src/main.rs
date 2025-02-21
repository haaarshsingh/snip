mod snip;

use std::env;

use actix_cors::Cors;
use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer};
use dotenv::dotenv;
use hyperpolyglot::{self, detect_from_text};
use mongodb::{bson::doc, Client, Collection};
use nanoid::nanoid;
use serde_json::json;
use snip::SnipObject;

const DB_NAME: &str = "snipdb";
const COLL_NAME: &str = "snips";

#[get("/snips/get/{_id}")]
async fn get_snip(client: web::Data<Client>, _id: web::Path<String>) -> HttpResponse {
    let snip_object_id = _id.into_inner();

    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    match collection.find_one(doc! { "_id": &snip_object_id }).await {
        Ok(Some(snip)) => HttpResponse::Ok().json(snip),
        Ok(None) => HttpResponse::NotFound()
            .json(json!({ "error": format!("no snip found with _id: {}", snip_object_id) })),
        Err(err) => HttpResponse::InternalServerError().json(json!({ "error": err.to_string() })),
    }
}

#[post("/snips/create")]
async fn create_snip(client: web::Data<Client>, snip_json: web::Json<SnipObject>) -> HttpResponse {
    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);
    let mut new_snip = snip_json.into_inner().set_expiry(0);

    if new_snip._id.is_none() {
        new_snip._id = Some(nanoid!(3));
    }

    let result = collection.insert_one(&new_snip).await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({
            "status": "success",
            "data": {
                "message": "snip created successfully",
                "_id": &new_snip._id
            }
        })),
        Err(err) => HttpResponse::InternalServerError().json(json!({
            "status": "error",
            "error": {
                "message": "failed to create snip",
                "details": err.to_string()
            }
        })),
    }
}

#[get("/snips/detect/{_id}")]
async fn detect_snip_languages(client: web::Data<Client>, _id: web::Path<String>) -> HttpResponse {
    let snip_object_id = _id.into_inner();
    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    match collection.find_one(doc! { "_id": &snip_object_id }).await {
        Ok(Some(mut snip_obj)) => {
            let languages: Vec<String> = snip_obj
                .snips
                .iter_mut()
                .map(|snip| {
                    if snip.language.as_deref() == Some("Autodetect") && !snip.content.is_empty() {
                        detect_from_text(&snip.content)
                            .map(|detection| detection.language().to_string())
                            .unwrap_or_else(|| "Unknown".to_string())
                    } else {
                        if snip.language.as_deref() == Some("Autodetect") {
                            "Unknown".to_string()
                        } else {
                            snip.language
                                .clone()
                                .unwrap_or_else(|| "Unknown".to_string())
                        }
                    }
                })
                .collect();

            HttpResponse::Ok().json(json!({ "languages": languages }))
        }
        Ok(None) => HttpResponse::NotFound()
            .json(json!({ "error": format!("no snip found with _id: {}", snip_object_id) })),
        Err(err) => HttpResponse::InternalServerError().json(json!({ "error": err.to_string() })),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let uri = env::var("MONGO_DB_URI")
        .expect("MONGO_DB_URI environment variable not set! Check your .env file.");

    let client = Client::with_uri_str(&uri).await.expect("failed to connect");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_origin("https://snip.tf")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE])
            .supports_credentials()
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(client.clone()))
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .service(get_snip)
            .service(create_snip)
            .service(detect_snip_languages)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
