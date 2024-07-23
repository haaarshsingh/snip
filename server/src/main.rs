mod snip;

use actix_web::{get, web, App, HttpResponse, HttpServer};
use mongodb::{bson::doc, Client, Collection};
use snip::Snip;

const DB_NAME: &str = "snipdb";
const COLL_NAME: &str = "snips";

#[get("/snips/get/{id}")]
async fn get_snip(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let snip_id = id.into_inner();

    let collection: Collection<Snip> = client.database(DB_NAME).collection(COLL_NAME);
    match collection.find_one(doc! { "id": &snip_id }).await {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => HttpResponse::NotFound().body(format!("no snip found with id: {snip_id}")),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    let client = Client::with_uri_str(uri).await.expect("failed to connect");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(get_snip)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
