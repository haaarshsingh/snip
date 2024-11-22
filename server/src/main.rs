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

fn detect_language(file_name: &Option<String>) -> String {
    let language_map = vec![
        ("Autodetect", ""),
        ("APL", ".apl"),
        ("ASCII Armor", ".asc"),
        ("Asterisk", ".asterisk"),
        ("Brainfuck", ".bf"),
        ("C", ".c"),
        ("C++", ".cpp"),
        ("C#", ".cs"),
        ("Cassandra", ".cql"),
        ("Ceylon", ".ceylon"),
        ("Clojure", ".clj"),
        ("CMake", ".cmake"),
        ("Cobol", ".cbl"),
        ("CoffeeScript", ".coffee"),
        ("CommonLisp", ".lisp"),
        ("Crystal", ".cr"),
        ("CSS", ".css"),
        ("Cython", ".pyx"),
        ("D", ".d"),
        ("Dart", ".dart"),
        ("diff", ".diff"),
        ("Dockerfile", "Dockerfile"),
        ("DTD", ".dtd"),
        ("Dylan", ".dylan"),
        ("EBNF", ".ebnf"),
        ("ECL", ".ecl"),
        ("Eiffel", ".e"),
        ("Elm", ".elm"),
        ("Erlang", ".erl"),
        ("Esper", ".esper"),
        ("F#", ".fs"),
        ("FCL", ".fcl"),
        ("Fortran", ".f90"),
        ("Forth", ".forth"),
        ("Gas", ".s"),
        ("Gas ARM", ".arm"),
        ("Gherkin", ".feature"),
        ("Go", ".go"),
        ("GraphQL", ".gql"),
        ("Groovy", ".groovy"),
        ("Haskell", ".hs"),
        ("Haxe", ".hx"),
        ("Hive", ".hql"),
        ("HTML", ".html"),
        ("HTTP", ".http"),
        ("IDL", ".idl"),
        ("Java", ".java"),
        ("JavaScript", ".js"),
        ("Jinja2", ".j2"),
        ("JSON", ".json"),
        ("JSON-LD", ".jsonld"),
        ("JSX", ".jsx"),
        ("Julia", ".jl"),
        ("Kotlin", ".kt"),
        ("LESS", ".less"),
        ("LiveScript", ".ls"),
        ("Lua", ".lua"),
        ("Markdown", ".md"),
        ("MariaDB SQL", ".sql"),
        ("Mathematica", ".nb"),
        ("mbox", ".mbox"),
        ("MIR", ".mir"),
        ("MscGen", ".mscgen"),
        ("MsGenny", ".msgenny"),
        ("MSSQL", ".sql"),
        ("Mumps", ".mps"),
        ("MySQL", ".sql"),
        ("nginx", ".nginx"),
        ("NesC", ".nc"),
        ("NTriples", ".nt"),
        ("Objective C++", ".mm"),
        ("Objective-C", ".m"),
        ("Octave", ".m"),
        ("oCaml", ".ml"),
        ("Pascal", ".pas"),
        ("Perl", ".pl"),
        ("PHP", ".php"),
        ("Pig", ".pig"),
        ("PLSQL", ".pls"),
        ("PostgreSQL", ".sql"),
        ("PowerShell", ".ps1"),
        ("Protobuf", ".proto"),
        ("Python", ".py"),
        ("Q", ".q"),
        ("R", ".r"),
        ("RPM", ".rpm"),
        ("Ruby", ".rb"),
        ("Rust", ".rs"),
        ("SAS", ".sas"),
        ("Sass", ".sass"),
        ("Scala", ".scala"),
        ("Scheme", ".scm"),
        ("SCSS", ".scss"),
        ("Shell", ".sh"),
        ("Smalltalk", ".st"),
        ("SML", ".sml"),
        ("Solr", ".solr"),
        ("SparkSQL", ".sql"),
        ("Spreadsheet", ".xls"),
        ("SQL", ".sql"),
        ("SQLite", ".sqlite"),
        ("Squirrel", ".nut"),
        ("Stylus", ".styl"),
        ("Swift", ".swift"),
        ("Tcl", ".tcl"),
        ("Textile", ".textile"),
        ("TiddlyWiki", ".tid"),
        ("Tiki", ".tiki"),
        ("TLV", ".tlv"),
        ("TOML", ".toml"),
        ("Troff", ".tr"),
        ("TSX", ".tsx"),
        ("TTCN", ".ttcn"),
        ("TTCN_CFG", ".ttcn_cfg"),
        ("Turtle", ".ttl"),
        ("TypeScript", ".ts"),
        ("VB.NET", ".vb"),
        ("VBScript", ".vbs"),
        ("Verilog", ".v"),
        ("Velocity", ".vm"),
        ("VHDL", ".vhdl"),
        ("Visual Basic", ".vb"),
        ("WAST", ".wast"),
        ("Web IDL", ".webidl"),
        ("XML", ".xml"),
        ("XQuery", ".xq"),
        ("XSLT", ".xslt"),
        ("YAML", ".yaml"),
        ("Z80", ".z80"),
    ];

    if let Some(name) = file_name {
        if let Some((lang, _)) = language_map.iter().find(|(_, ext)| name.ends_with(ext)) {
            return lang.to_string();
        }
    }
    "Autodetect".to_string()
}

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
async fn create_snip(
    client: web::Data<Client>,
    mut new_snip: web::Json<SnipObject>,
) -> HttpResponse {
    let collection: Collection<SnipObject> = client.database(DB_NAME).collection(COLL_NAME);

    if new_snip._id.is_none() {
        new_snip._id = Some(nanoid!(3));
    }

    // todo: check Snip title instead of SnipObject title
    if let Some(title) = &new_snip.title {
        let detected_language = detect_language(&Some(title.clone()));
    
        for snip in &mut new_snip.snips {
            if snip.language.as_deref() == Some("Autodetect") {
                snip.language = Some(detected_language.clone());
            }
        }
    }
    
    let result = collection.insert_one(new_snip.clone()).await;

    match result {
        Ok(_) => HttpResponse::Ok().json(json!({
            "status": "success",
            "data": {
                "message": "Snip created successfully",
                "_id": new_snip._id
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
