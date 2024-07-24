mod snip;

use actix_web::{get, post, web, App, HttpResponse, HttpServer};
use dotenv::dotenv;
use mongodb::{bson::doc, Client, Collection};
use nanoid::nanoid;
use snip::SnipObject;

const DB_NAME: &str = "snipdb";
const COLL_NAME: &str = "snips";

#[get("/snips/get/{id}")]
async fn get_snip(client: web::Data<Client>, id: web::Path<String>) -> HttpResponse {
    let snip_object_id = id.into_inner();

    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    match collection.find_one(doc! { "id": &snip_object_id }).await {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => {
            HttpResponse::NotFound().body(format!("no snip found with id: {snip_object_id}"))
        }
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[post("/snips/create")]
async fn create_snip(
    client: web::Data<Client>,
    mut new_snip: web::Json<SnipObject>,
) -> HttpResponse {
    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    if new_snip.id == None {
        new_snip.id = Some(nanoid!(3));
    }

    let result = collection.insert_one(new_snip.into_inner()).await;

    match result {
        Ok(_) => HttpResponse::Ok().body("snip added successfully"),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let uri = std::env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".into());

    let client = Client::with_uri_str(uri).await.expect("failed to connect");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(get_snip)
            .service(create_snip)
    })
    .bind(("localhost", 4000))?
    .run()
    .await
}
