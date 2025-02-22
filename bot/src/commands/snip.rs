use reqwest::Client;
use serde::{Deserialize, Serialize};
use serenity::framework::standard::{macros::command, Args, CommandResult};
use serenity::model::prelude::*;
use serenity::prelude::*;
use std::collections::HashMap;

#[command]
async fn snip(ctx: &Context, msg: &Message, args: Args) -> CommandResult {
    let mut snip_title = None;
    let mut args_iter = args.raw();

    let mut error_msg = None;

    while let Some(arg) = args_iter.next() {
        if arg == "-t" {
            if let Some(title) = args_iter.next() {
                snip_title = Some(title.to_string());
            }
        }
    }

    let codeblocks = extract_codeblocks(&msg.content);

    if codeblocks.is_empty() {
        error_msg = Some("No codeblock(s) found.");
    } else {
        let request_payload = SnipPayload {
            title: snip_title.unwrap_or_else(|| "".to_string()),
            snips: codeblocks,
        };

        let client = Client::new();
        let response = client
            .post("https://api.snip.tf/snips/create")
            .json(&request_payload)
            .send()
            .await;

        match response {
            Ok(resp) => {
                let status = resp.status();
                if status.is_success() {
                    match resp.json::<SnipResponse>().await {
                        Ok(parsed_body) => {
                            msg.channel_id
                                .say(ctx, format!("https://snip.tf/{}", parsed_body.data._id))
                                .await?;
                        }
                        Err(err) => {
                            error_msg = Some(format!("Failed to parse response: {}", err).as_str());
                        }
                    }
                } else {
                    let body = resp
                        .text()
                        .await
                        .unwrap_or_else(|_| "Unknown error".to_string());

                    let err_msg = format!("Request failed. Status: {}, Body: {}", status, body);
                    error_msg = Some(err_msg.as_str());
                }
            }
            Err(err) => {
                error_msg = Some(format!("Failed to send request: {}", err).as_str());
            }
        }
    }

    let _ = msg
        .channel_id
        .send_message(&ctx.http, |m| {
            if let Some(error_message) = error_msg {
                m.embed(|e| {
                    e.title("Error ❌")
                        .description(error_message)
                        .color(serenity::utils::Color::from_rgb(255, 0, 0))
                        .field(
                            "Problems?",
                            "Open a new [issue](https://github.com/haaarshsingh/snip/issues/new), email yo@harshsingh.xyz, \nor reach out to [@haaarshsingh](https://twitter.com/haaarshsingh).",
                            false,
                        )
                        .footer(|f| f.text("snip.tf"))
                        .timestamp(chrono::Utc::now())
                });
            }
            m
        })
        .await;

    Ok(())
}

fn extract_codeblocks(message: &str) -> Vec<CodeBlock> {
    let mut codeblocks = Vec::new();
    let mut in_codeblock = false;

    let mut language = String::new();
    let mut content = String::new();

    let mut index = 1;

    for line in message.lines() {
        if line.starts_with("```") {
            if in_codeblock {
                codeblocks.push(CodeBlock {
                    language: extension_to_language(language.clone().as_str()),
                    content: content.clone(),
                    title: format!("File{}.{}", index, language.clone()),
                });

                in_codeblock = false;
                language.clear();
                content.clear();

                index += 1;
            } else {
                in_codeblock = true;
                language = line.trim_start_matches("```").to_string();
            }
        } else if in_codeblock {
            content.push_str(line);
            content.push('\n');
        }
    }

    codeblocks
}

fn extension_to_language(extension: &str) -> String {
    let languages: Vec<(&str, &str)> = vec![
        ("", "Autodetect"),
        ("apl", "APL"),
        ("asc", "ASCII Armor"),
        ("asterisk", "Asterisk"),
        ("bf", "Brainfuck"),
        ("c", "C"),
        ("cpp", "C++"),
        ("cs", "C#"),
        ("cql", "Cassandra"),
        ("ceylon", "Ceylon"),
        ("clj", "Clojure"),
        ("cmake", "CMake"),
        ("cbl", "Cobol"),
        ("coffee", "CoffeeScript"),
        ("lisp", "CommonLisp"),
        ("cr", "Crystal"),
        ("css", "CSS"),
        ("pyx", "Cython"),
        ("d", "D"),
        ("dart", "Dart"),
        ("diff", "diff"),
        ("Dockerfile", "Dockerfile"),
        ("dtd", "DTD"),
        ("dylan", "Dylan"),
        ("ebnf", "EBNF"),
        ("ecl", "ECL"),
        ("e", "Eiffel"),
        ("elm", "Elm"),
        ("erl", "Erlang"),
        ("esper", "Esper"),
        ("fs", "F#"),
        ("fcl", "FCL"),
        ("f90", "Fortran"),
        ("forth", "Forth"),
        ("s", "Gas"),
        ("arm", "Gas ARM"),
        ("feature", "Gherkin"),
        ("go", "Go"),
        ("gql", "GraphQL"),
        ("groovy", "Groovy"),
        ("hs", "Haskell"),
        ("hx", "Haxe"),
        ("hql", "Hive"),
        ("html", "HTML"),
        ("http", "HTTP"),
        ("idl", "IDL"),
        ("java", "Java"),
        ("js", "JavaScript"),
        ("j2", "Jinja2"),
        ("json", "JSON"),
        ("jsonld", "JSON-LD"),
        ("jsx", "JSX"),
        ("jl", "Julia"),
        ("kt", "Kotlin"),
        ("less", "LESS"),
        ("ls", "LiveScript"),
        ("lua", "Lua"),
        ("md", "Markdown"),
        ("sql", "MariaDB SQL"),
        ("nb", "Mathematica"),
        ("mbox", "mbox"),
        ("mir", "MIR"),
        ("mscgen", "MscGen"),
        ("msgenny", "MsGenny"),
        ("mps", "Mumps"),
        ("nginx", "nginx"),
        ("nc", "NesC"),
        ("nt", "NTriples"),
        ("mm", "Objective C++"),
        ("m", "Objective-C"),
        ("ml", "oCaml"),
        ("pas", "Pascal"),
        ("pl", "Perl"),
        ("php", "PHP"),
        ("pig", "Pig"),
        ("pls", "PLSQL"),
        ("ps1", "PowerShell"),
        ("proto", "Protobuf"),
        ("py", "Python"),
        ("q", "Q"),
        ("r", "R"),
        ("rpm", "RPM"),
        ("rb", "Ruby"),
        ("rs", "Rust"),
        ("sas", "SAS"),
        ("sass", "Sass"),
        ("scala", "Scala"),
        ("scm", "Scheme"),
        ("scss", "SCSS"),
        ("sh", "Shell"),
        ("st", "Smalltalk"),
        ("sml", "SML"),
        ("solr", "Solr"),
        ("styl", "Stylus"),
        ("swift", "Swift"),
        ("tcl", "Tcl"),
        ("tsx", "TSX"),
        ("ttcn", "TTCN"),
        ("ttl", "Turtle"),
        ("ts", "TypeScript"),
        ("vb", "Visual Basic"),
        ("vbs", "VBScript"),
        ("vhdl", "VHDL"),
        ("xml", "XML"),
        ("xq", "XQuery"),
        ("yaml", "YAML"),
        ("z80", "Z80"),
    ];

    let language_map: HashMap<&str, &str> = languages.into_iter().collect();

    language_map
        .get(extension)
        .unwrap_or(&"Autodetect")
        .to_string()
}

#[derive(Debug, Serialize)]
struct CodeBlock {
    language: String,
    content: String,
    title: String,
}

#[derive(Serialize, Debug)]
struct SnipPayload {
    title: String,
    snips: Vec<CodeBlock>,
}

#[derive(Deserialize)]
struct SnipResponse {
    data: SnipData,
}

#[derive(Deserialize)]
struct SnipData {
    _id: String,
}