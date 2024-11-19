use serenity::framework::standard::{macros::command, CommandResult};
use serenity::model::prelude::*;
use serenity::prelude::*;
use std::collections::HashMap;

#[command]
async fn snip(ctx: &Context, msg: &Message) -> CommandResult {
    let codeblocks = extract_codeblocks(&msg.content);

    if codeblocks.is_empty() {
        msg.reply(ctx, "No codeblocks found!").await?;
    } else {
        let mut response = String::new();
        for codeblock in codeblocks {
            response.push_str(&format!(
                "Language: {}\nContent: {}",
                codeblock.language, codeblock.content
            ));
        }
        msg.channel_id.say(ctx, response).await?;
    }
    Ok(())
}

fn extract_codeblocks(message: &str) -> Vec<CodeBlock> {
    let mut codeblocks = Vec::new();
    let mut in_codeblock = false;
    let mut language = String::new();
    let mut content = String::new();

    for line in message.lines() {
        if line.starts_with("```") {
            if in_codeblock {
                codeblocks.push(CodeBlock {
                    language: extension_to_language(language.clone().as_str()),
                    content: content.clone(),
                });
                in_codeblock = false;
                language.clear();
                content.clear();
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

#[derive(Debug)]
struct CodeBlock {
    language: String,
    content: String,
}
