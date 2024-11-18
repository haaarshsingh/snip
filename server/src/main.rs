mod snip;

use std::env;

use actix_cors::Cors;
use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer};
use dotenv::dotenv;
use mongodb::{bson::doc, Client, Collection};
use nanoid::nanoid;
use serde_json::json;
use snip::SnipObject;

const DB_NAME: &str = "snipdb";
const COLL_NAME: &str = "snips";

#[get("/snips/get/{slug}")]
async fn get_snip(client: web::Data<Client>, slug: web::Path<String>) -> HttpResponse {
    let snip_object_slug = slug.into_inner();

    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    match collection.find_one(doc! { "slug": &snip_object_slug }).await {
        Ok(Some(snip)) => HttpResponse::Ok().json(snip),
        Ok(None) => HttpResponse::NotFound()
            .json(json!({ "error": format!("no snip found with slug: {}", snip_object_slug) })),
        Err(err) => HttpResponse::InternalServerError().json(json!({ "error": err.to_string() })),
    }
}

#[post("/snips/create")]
async fn create_snip(
    client: web::Data<Client>,
    mut new_snip: web::Json<SnipObject>,
) -> HttpResponse {
    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    if new_snip.slug.is_none() {
        new_snip.slug = Some(nanoid!(3));
    }

    let result = collection.insert_one(new_snip.clone()).await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({
            "status": "success",
            "data": {
                "message": "Snip created successfully",
                "slug": new_snip.slug 
            }
        })),
        Err(err) => HttpResponse::InternalServerError().json(json!({
            "status": "error",
            "error": {
                "message": "Failed to create snip",
                "details": err.to_string()
            }
        })),
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
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
