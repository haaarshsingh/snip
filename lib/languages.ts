import { languages } from '@codemirror/language-data'
import { StreamLanguage } from '@codemirror/language'
import { cpp } from '@codemirror/lang-cpp'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { php } from '@codemirror/lang-php'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
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
import { wast } from '@codemirror/lang-wast'
import { xml } from '@codemirror/lang-xml'
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
  javascript,
  cpp,
  wast,
  apl: () => StreamLanguage.define(apl),
  asciiArmor: () => StreamLanguage.define(asciiArmor),
  asterisk: () => StreamLanguage.define(asterisk),
  cmake: () => StreamLanguage.define(cmake),
  cobol: () => StreamLanguage.define(cobol),
  commonLisp: () => StreamLanguage.define(commonLisp),
  crystal: () => StreamLanguage.define(crystal),
  cypher: () => StreamLanguage.define(cypher),
  d: () => StreamLanguage.define(d),
  dart: () => StreamLanguage.define(dart),
  objectiveC: () => StreamLanguage.define(objectiveC),
  scala: () => StreamLanguage.define(scala),
  kotlin: () => StreamLanguage.define(kotlin),
  diff: () => StreamLanguage.define(diff),
  dtd: () => StreamLanguage.define(dtd),
  dylan: () => StreamLanguage.define(dylan),
  ebnf: () => StreamLanguage.define(ebnf),
  ecl: () => StreamLanguage.define(ecl),
  eiffel: () => StreamLanguage.define(eiffel),
  elm: () => StreamLanguage.define(elm),
  factor: () => StreamLanguage.define(factor),
  fcl: () => StreamLanguage.define(fcl),
  forth: () => StreamLanguage.define(forth),
  fortran: () => StreamLanguage.define(fortran),
  gas: () => StreamLanguage.define(gas),
  gherkin: () => StreamLanguage.define(gherkin),
  gasArm: () => StreamLanguage.define(gasArm),
  groovy: () => StreamLanguage.define(groovy),
  haskell: () => StreamLanguage.define(haskell),
  haxe: () => StreamLanguage.define(haxe),
  hxml: () => StreamLanguage.define(hxml),
  http: () => StreamLanguage.define(http),
  idl: () => StreamLanguage.define(idl),
  jinja2: () => StreamLanguage.define(jinja2),
  mathematica: () => StreamLanguage.define(mathematica),
  mbox: () => StreamLanguage.define(mbox),
  mirc: () => StreamLanguage.define(mirc),
  fSharp: () => StreamLanguage.define(fSharp),
  oCaml: () => StreamLanguage.define(oCaml),
  sml: () => StreamLanguage.define(sml),
  scss: () => StreamLanguage.define(sCSS),
  less: () => StreamLanguage.define(less),
  gss: () => StreamLanguage.define(gss),
  cython: () => StreamLanguage.define(cython),
  jsonld: () => StreamLanguage.define(jsonld),
  xu: () => StreamLanguage.define(xu),
  stexMath: () => StreamLanguage.define(stexMath),
  gql: () => StreamLanguage.define(gql),
  gpsql: () => StreamLanguage.define(gpSQL),
  sparkSQL: () => StreamLanguage.define(sparkSQL),
  esper: () => StreamLanguage.define(esper),
  hive: () => StreamLanguage.define(hive),
  tlv: () => StreamLanguage.define(tlv),
  modelica: () => StreamLanguage.define(modelica),
  mscgen: () => StreamLanguage.define(mscgen),
  msgenny: () => StreamLanguage.define(msgenny),
  mumps: () => StreamLanguage.define(mumps),
  nsis: () => StreamLanguage.define(nsis),
  ntriples: () => StreamLanguage.define(ntriples),
  octave: () => StreamLanguage.define(octave),
  oz: () => StreamLanguage.define(oz),
  pig: () => StreamLanguage.define(pig),
  properties: () => StreamLanguage.define(properties),
  protobuf: () => StreamLanguage.define(protobuf),
  q: () => StreamLanguage.define(q),
  rpmSpec: () => StreamLanguage.define(rpmSpec),
  rpmChanges: () => StreamLanguage.define(rpmChanges),
  sas: () => StreamLanguage.define(sas),
  sass: () => StreamLanguage.define(sass),
  sieve: () => StreamLanguage.define(sieve),
  smalltalk: () => StreamLanguage.define(smalltalk),
  solr: () => StreamLanguage.define(solr),
  sparql: () => StreamLanguage.define(sparql),
  spreadsheet: () => StreamLanguage.define(spreadsheet),
  stex: () => StreamLanguage.define(stex),
  textile: () => StreamLanguage.define(textile),
  tiddlyWiki: () => StreamLanguage.define(tiddlyWiki),
  tiki: () => StreamLanguage.define(tiki),
  troff: () => StreamLanguage.define(troff),
  ttcn: () => StreamLanguage.define(ttcn),
  ttcnCfg: () => StreamLanguage.define(ttcnCfg),
  turtle: () => StreamLanguage.define(turtle),
  vbScriptASP: () => StreamLanguage.define(vbScriptASP),
  velocity: () => StreamLanguage.define(velocity),
  verilog: () => StreamLanguage.define(verilog),
  vhdl: () => StreamLanguage.define(vhdl),
  webIDL: () => StreamLanguage.define(webIDL),
  xQuery: () => StreamLanguage.define(xQuery),
  yacas: () => StreamLanguage.define(yacas),
  z80: () => StreamLanguage.define(z80),
  ez80: () => StreamLanguage.define(ez80),
  jsx: () => javascript({ jsx: true }),
  typescript: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  json,
  squirrel: () => StreamLanguage.define(squirrel),
  ceylon: () => StreamLanguage.define(ceylon),
  c: () => StreamLanguage.define(c),
  csharp: () => StreamLanguage.define(csharp),
  objectiveCpp: () => StreamLanguage.define(objectiveCpp),
  nesC: () => StreamLanguage.define(nesC),
  shader: () => StreamLanguage.define(shader),
  html,
  css,
  python,
  markdown: () =>
    markdown({ base: markdownLanguage, codeLanguages: languages }),
  xml,
  cassandra: () => sql({ dialect: Cassandra }),
  mssql: () => sql({ dialect: MSSQL }),
  mariasql: () => sql({ dialect: MariaSQL }),
  plsql: () => sql({ dialect: PLSQL }),
  sqlite: () => sql({ dialect: SQLite }),
  sql: () => sql({ dialect: StandardSQL }),
  mysql: () => sql({ dialect: MySQL }),
  pgsql: () => sql({ dialect: PostgreSQL }),
  java,
  rust,
  php,
  go: () => StreamLanguage.define(go),
  shell: () => StreamLanguage.define(shell),
  lua: () => StreamLanguage.define(lua),
  swift: () => StreamLanguage.define(swift),
  tcl: () => StreamLanguage.define(tcl),
  yaml: () => StreamLanguage.define(yaml),
  vb: () => StreamLanguage.define(vb),
  powershell: () => StreamLanguage.define(powerShell),
  brainfuck: () => StreamLanguage.define(brainfuck),
  stylus: () => StreamLanguage.define(stylus),
  erlang: () => StreamLanguage.define(erlang),
  nginx: () => StreamLanguage.define(nginx),
  perl: () => StreamLanguage.define(perl),
  ruby: () => StreamLanguage.define(ruby),
  pascal: () => StreamLanguage.define(pascal),
  livescript: () => StreamLanguage.define(liveScript),
  scheme: () => StreamLanguage.define(scheme),
  toml: () => StreamLanguage.define(toml),
  vbscript: () => StreamLanguage.define(vbScript),
  clojure: () => StreamLanguage.define(clojure),
  coffeescript: () => StreamLanguage.define(coffeeScript),
  julia: () => StreamLanguage.define(julia),
  dockerfile: () => StreamLanguage.define(dockerFile),
  r: () => StreamLanguage.define(r),
}

export default langs
