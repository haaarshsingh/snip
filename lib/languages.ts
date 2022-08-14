import { languages } from '@codemirror/language-data'
import { StreamLanguage } from '@codemirror/language'
import { cpp } from '@codemirror/lang-cpp'
import { css as CSS } from '@codemirror/lang-css'
import { html as HTML } from '@codemirror/lang-html'
import { java as Java } from '@codemirror/lang-java'
import { javascript as JavaScript } from '@codemirror/lang-javascript'
import { json as JSON } from '@codemirror/lang-json'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { php as PHP } from '@codemirror/lang-php'
import { python as Python } from '@codemirror/lang-python'
import { rust as Rust } from '@codemirror/lang-rust'
import {
  Cassandra,
  MSSQL,
  MariaSQL,
  MySQL,
  PLSQL,
  PostgreSQL,
  SQLite,
  StandardSQL,
  sql,
} from '@codemirror/lang-sql'
import { wast as WAST } from '@codemirror/lang-wast'
import { xml as XML } from '@codemirror/lang-xml'
import { apl } from '@codemirror/legacy-modes/mode/apl'
import { asciiArmor } from '@codemirror/legacy-modes/mode/asciiarmor'
import { asterisk } from '@codemirror/legacy-modes/mode/asterisk'
import { brainfuck } from '@codemirror/legacy-modes/mode/brainfuck'
import {
  dart,
  objectiveC,
  scala,
  kotlin,
  squirrel,
  ceylon,
  c,
  csharp,
  objectiveCpp,
  nesC,
  shader,
} from '@codemirror/legacy-modes/mode/clike'
import { clojure } from '@codemirror/legacy-modes/mode/clojure'
import { cmake } from '@codemirror/legacy-modes/mode/cmake'
import { cobol } from '@codemirror/legacy-modes/mode/cobol'
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript'
import { commonLisp } from '@codemirror/legacy-modes/mode/commonlisp'
import { crystal } from '@codemirror/legacy-modes/mode/crystal'
import { sCSS, less, gss } from '@codemirror/legacy-modes/mode/css'
import { cypher } from '@codemirror/legacy-modes/mode/cypher'
import { cython } from '@codemirror/legacy-modes/mode/python'
import { d } from '@codemirror/legacy-modes/mode/d'
import { diff } from '@codemirror/legacy-modes/mode/diff'
import { dockerFile } from '@codemirror/legacy-modes/mode/dockerfile'
import { dtd } from '@codemirror/legacy-modes/mode/dtd'
import { dylan } from '@codemirror/legacy-modes/mode/dylan'
import { ebnf } from '@codemirror/legacy-modes/mode/ebnf'
import { ecl } from '@codemirror/legacy-modes/mode/ecl'
import { eiffel } from '@codemirror/legacy-modes/mode/eiffel'
import { elm } from '@codemirror/legacy-modes/mode/elm'
import { erlang } from '@codemirror/legacy-modes/mode/erlang'
import { factor } from '@codemirror/legacy-modes/mode/factor'
import { fcl } from '@codemirror/legacy-modes/mode/fcl'
import { forth } from '@codemirror/legacy-modes/mode/forth'
import { fortran } from '@codemirror/legacy-modes/mode/fortran'
import { gas, gasArm } from '@codemirror/legacy-modes/mode/gas'
import { gherkin } from '@codemirror/legacy-modes/mode/gherkin'
import { go } from '@codemirror/legacy-modes/mode/go'
import { groovy } from '@codemirror/legacy-modes/mode/groovy'
import { haskell } from '@codemirror/legacy-modes/mode/haskell'
import { haxe, hxml } from '@codemirror/legacy-modes/mode/haxe'
import { http } from '@codemirror/legacy-modes/mode/http'
import { idl } from '@codemirror/legacy-modes/mode/idl'
import { jinja2 } from '@codemirror/legacy-modes/mode/jinja2'
import { julia } from '@codemirror/legacy-modes/mode/julia'
import { jsonld } from '@codemirror/legacy-modes/mode/javascript'
import { liveScript } from '@codemirror/legacy-modes/mode/livescript'
import { lua } from '@codemirror/legacy-modes/mode/lua'
import { mathematica } from '@codemirror/legacy-modes/mode/mathematica'
import { mbox } from '@codemirror/legacy-modes/mode/mbox'
import { mirc } from '@codemirror/legacy-modes/mode/mirc'
import { fSharp, oCaml, sml } from '@codemirror/legacy-modes/mode/mllike'
import { modelica } from '@codemirror/legacy-modes/mode/modelica'
import { mscgen, msgenny, xu } from '@codemirror/legacy-modes/mode/mscgen'
import { mumps } from '@codemirror/legacy-modes/mode/mumps'
import { nginx } from '@codemirror/legacy-modes/mode/nginx'
import { nsis } from '@codemirror/legacy-modes/mode/nsis'
import { ntriples } from '@codemirror/legacy-modes/mode/ntriples'
import { octave } from '@codemirror/legacy-modes/mode/octave'
import { oz } from '@codemirror/legacy-modes/mode/oz'
import { pascal } from '@codemirror/legacy-modes/mode/pascal'
import { perl } from '@codemirror/legacy-modes/mode/perl'
import { pig } from '@codemirror/legacy-modes/mode/pig'
import { powerShell } from '@codemirror/legacy-modes/mode/powershell'
import { properties } from '@codemirror/legacy-modes/mode/properties'
import { protobuf } from '@codemirror/legacy-modes/mode/protobuf'
import { q } from '@codemirror/legacy-modes/mode/q'
import { r } from '@codemirror/legacy-modes/mode/r'
import { rpmSpec, rpmChanges } from '@codemirror/legacy-modes/mode/rpm'
import { ruby } from '@codemirror/legacy-modes/mode/ruby'
import { sas } from '@codemirror/legacy-modes/mode/sas'
import { sass } from '@codemirror/legacy-modes/mode/sass'
import { scheme } from '@codemirror/legacy-modes/mode/scheme'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { sieve } from '@codemirror/legacy-modes/mode/sieve'
import { smalltalk } from '@codemirror/legacy-modes/mode/smalltalk'
import { solr } from '@codemirror/legacy-modes/mode/solr'
import { sparql } from '@codemirror/legacy-modes/mode/sparql'
import { spreadsheet } from '@codemirror/legacy-modes/mode/spreadsheet'
import { stex, stexMath } from '@codemirror/legacy-modes/mode/stex'
import { stylus } from '@codemirror/legacy-modes/mode/stylus'
import { swift } from '@codemirror/legacy-modes/mode/swift'
import { tcl } from '@codemirror/legacy-modes/mode/tcl'
import { textile } from '@codemirror/legacy-modes/mode/textile'
import { tiddlyWiki } from '@codemirror/legacy-modes/mode/tiddlywiki'
import { tiki } from '@codemirror/legacy-modes/mode/tiki'
import { toml } from '@codemirror/legacy-modes/mode/toml'
import { troff } from '@codemirror/legacy-modes/mode/troff'
import { ttcn } from '@codemirror/legacy-modes/mode/ttcn'
import { ttcnCfg } from '@codemirror/legacy-modes/mode/ttcn-cfg'
import { turtle } from '@codemirror/legacy-modes/mode/turtle'
import {
  gql,
  gpSQL,
  sparkSQL,
  esper,
  hive,
} from '@codemirror/legacy-modes/mode/sql'
import { vb } from '@codemirror/legacy-modes/mode/vb'
import { vbScript, vbScriptASP } from '@codemirror/legacy-modes/mode/vbscript'
import { velocity } from '@codemirror/legacy-modes/mode/velocity'
import { verilog, tlv } from '@codemirror/legacy-modes/mode/verilog'
import { vhdl } from '@codemirror/legacy-modes/mode/vhdl'
import { webIDL } from '@codemirror/legacy-modes/mode/webidl'
import { xQuery } from '@codemirror/legacy-modes/mode/xquery'
import { yacas } from '@codemirror/legacy-modes/mode/yacas'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import { z80, ez80 } from '@codemirror/legacy-modes/mode/z80'

const langs = {
  JavaScript,
  'C++': cpp,
  WAST,
  APL: () => StreamLanguage.define(apl),
  'ASCII Armor': () => StreamLanguage.define(asciiArmor),
  Asterisk: () => StreamLanguage.define(asterisk),
  CMake: () => StreamLanguage.define(cmake),
  Cobol: () => StreamLanguage.define(cobol),
  CommonLisp: () => StreamLanguage.define(commonLisp),
  Crystal: () => StreamLanguage.define(crystal),
  Cypher: () => StreamLanguage.define(cypher),
  D: () => StreamLanguage.define(d),
  Dart: () => StreamLanguage.define(dart),
  'Objective-C': () => StreamLanguage.define(objectiveC),
  Scala: () => StreamLanguage.define(scala),
  Kotlin: () => StreamLanguage.define(kotlin),
  diff: () => StreamLanguage.define(diff),
  DTD: () => StreamLanguage.define(dtd),
  Dylan: () => StreamLanguage.define(dylan),
  EBNF: () => StreamLanguage.define(ebnf),
  ECL: () => StreamLanguage.define(ecl),
  Eiffel: () => StreamLanguage.define(eiffel),
  Elm: () => StreamLanguage.define(elm),
  Factor: () => StreamLanguage.define(factor),
  FCL: () => StreamLanguage.define(fcl),
  Forth: () => StreamLanguage.define(forth),
  Fortran: () => StreamLanguage.define(fortran),
  Gas: () => StreamLanguage.define(gas),
  Gherkin: () => StreamLanguage.define(gherkin),
  'Gas ARM': () => StreamLanguage.define(gasArm),
  Groovy: () => StreamLanguage.define(groovy),
  Haskell: () => StreamLanguage.define(haskell),
  Haxe: () => StreamLanguage.define(haxe),
  HXML: () => StreamLanguage.define(hxml),
  HTTP: () => StreamLanguage.define(http),
  IDL: () => StreamLanguage.define(idl),
  Jinja2: () => StreamLanguage.define(jinja2),
  Mathematica: () => StreamLanguage.define(mathematica),
  mbox: () => StreamLanguage.define(mbox),
  mIRC: () => StreamLanguage.define(mirc),
  'F#': () => StreamLanguage.define(fSharp),
  oCaml: () => StreamLanguage.define(oCaml),
  SML: () => StreamLanguage.define(sml),
  scss: () => StreamLanguage.define(sCSS),
  LESS: () => StreamLanguage.define(less),
  'Closure Stylesheets (GSS)': () => StreamLanguage.define(gss),
  Cython: () => StreamLanguage.define(cython),
  'JSON-LD': () => StreamLanguage.define(jsonld),
  Xu: () => StreamLanguage.define(xu),
  'sTeX Math': () => StreamLanguage.define(stexMath),
  'GraphQL (gql)': () => StreamLanguage.define(gql),
  GPSQL: () => StreamLanguage.define(gpSQL),
  SparkSQL: () => StreamLanguage.define(sparkSQL),
  Esper: () => StreamLanguage.define(esper),
  Hive: () => StreamLanguage.define(hive),
  TLV: () => StreamLanguage.define(tlv),
  Modelica: () => StreamLanguage.define(modelica),
  MscGen: () => StreamLanguage.define(mscgen),
  MsGenny: () => StreamLanguage.define(msgenny),
  Mumps: () => StreamLanguage.define(mumps),
  NSIS: () => StreamLanguage.define(nsis),
  NTriples: () => StreamLanguage.define(ntriples),
  Octave: () => StreamLanguage.define(octave),
  Oz: () => StreamLanguage.define(oz),
  Pig: () => StreamLanguage.define(pig),
  Properties: () => StreamLanguage.define(properties),
  Protobuf: () => StreamLanguage.define(protobuf),
  Q: () => StreamLanguage.define(q),
  RPM: () => StreamLanguage.define(rpmSpec),
  'RPM Changes': () => StreamLanguage.define(rpmChanges),
  Sas: () => StreamLanguage.define(sas),
  Sass: () => StreamLanguage.define(sass),
  Sieve: () => StreamLanguage.define(sieve),
  Smalltalk: () => StreamLanguage.define(smalltalk),
  Solr: () => StreamLanguage.define(solr),
  SPARQL: () => StreamLanguage.define(sparql),
  Spreadsheet: () => StreamLanguage.define(spreadsheet),
  sTeX: () => StreamLanguage.define(stex),
  Textile: () => StreamLanguage.define(textile),
  TiddlyWiki: () => StreamLanguage.define(tiddlyWiki),
  Tiki: () => StreamLanguage.define(tiki),
  Troff: () => StreamLanguage.define(troff),
  TTCN: () => StreamLanguage.define(ttcn),
  TTCN_CFG: () => StreamLanguage.define(ttcnCfg),
  Turtle: () => StreamLanguage.define(turtle),
  'VB.NET': () => StreamLanguage.define(vbScriptASP),
  Velocity: () => StreamLanguage.define(velocity),
  Verilog: () => StreamLanguage.define(verilog),
  VHDL: () => StreamLanguage.define(vhdl),
  'Web IDL': () => StreamLanguage.define(webIDL),
  xQuery: () => StreamLanguage.define(xQuery),
  Yacas: () => StreamLanguage.define(yacas),
  Z80: () => StreamLanguage.define(z80),
  eZ80: () => StreamLanguage.define(ez80),
  JSX: () => JavaScript({ jsx: true }),
  TypeScript: () => JavaScript({ typescript: true }),
  TSX: () => JavaScript({ jsx: true, typescript: true }),
  JSON,
  Squirrel: () => StreamLanguage.define(squirrel),
  Ceylon: () => StreamLanguage.define(ceylon),
  C: () => StreamLanguage.define(c),
  'C#': () => StreamLanguage.define(csharp),
  'Objective C++': () => StreamLanguage.define(objectiveCpp),
  nesC: () => StreamLanguage.define(nesC),
  shader: () => StreamLanguage.define(shader),
  HTML,
  CSS,
  Python,
  Markdown: () =>
    markdown({ base: markdownLanguage, codeLanguages: languages }),
  XML,
  Cassandra: () => sql({ dialect: Cassandra }),
  MSSQL: () => sql({ dialect: MSSQL }),
  'MariaDB SQL': () => sql({ dialect: MariaSQL }),
  PLSQL: () => sql({ dialect: PLSQL }),
  SQLite: () => sql({ dialect: SQLite }),
  SQL: () => sql({ dialect: StandardSQL }),
  MySQL: () => sql({ dialect: MySQL }),
  PostgreSQL: () => sql({ dialect: PostgreSQL }),
  Java,
  Rust,
  PHP,
  Go: () => StreamLanguage.define(go),
  Shell: () => StreamLanguage.define(shell),
  Lua: () => StreamLanguage.define(lua),
  Swift: () => StreamLanguage.define(swift),
  Tcl: () => StreamLanguage.define(tcl),
  YAML: () => StreamLanguage.define(yaml),
  'Visual Basic': () => StreamLanguage.define(vb),
  PowerShell: () => StreamLanguage.define(powerShell),
  Brainfuck: () => StreamLanguage.define(brainfuck),
  Stylus: () => StreamLanguage.define(stylus),
  Erlang: () => StreamLanguage.define(erlang),
  nginx: () => StreamLanguage.define(nginx),
  Perl: () => StreamLanguage.define(perl),
  Ruby: () => StreamLanguage.define(ruby),
  Pascal: () => StreamLanguage.define(pascal),
  LiveScript: () => StreamLanguage.define(liveScript),
  Scheme: () => StreamLanguage.define(scheme),
  TOML: () => StreamLanguage.define(toml),
  VBScript: () => StreamLanguage.define(vbScript),
  Clojure: () => StreamLanguage.define(clojure),
  CoffeeScript: () => StreamLanguage.define(coffeeScript),
  Julia: () => StreamLanguage.define(julia),
  Dockerfile: () => StreamLanguage.define(dockerFile),
  R: () => StreamLanguage.define(r),
}

export default langs
