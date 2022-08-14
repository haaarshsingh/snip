import { Command, CommandMenu, useCommands, useKmenu } from 'kmenu'
import { FC } from 'react'
import {
  FiClock,
  FiCode,
  FiCopy,
  FiEdit2,
  FiGithub,
  FiGitlab,
  FiLock,
} from 'react-icons/fi'
import { BiPaintRoll } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useState } from 'react'

const Palette: FC = () => {
  const [input, setInput, open, setOpen] = useKmenu()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('plain')

  const main: Command[] = [
    {
      category: 'Account',
      commands: [
        {
          icon: <FiGithub />,
          text: 'Continue With GitHub',
        },
        {
          icon: <FiGitlab />,
          text: 'Continue With GitLab',
        },
      ],
    },
    {
      category: 'Utility',
      commands: [
        {
          icon: <FiCode />,
          text: 'Language...',
          perform: () => setOpen(2),
        },
        {
          icon: <FiClock />,
          text: 'Expires...',
        },
        {
          icon: <FiLock />,
          text: 'Encrypt...',
        },
        {
          icon: <FiEdit2 />,
          text: 'Edit Slug...',
        },
      ],
    },
    {
      category: 'General',
      commands: [
        {
          icon: <BiPaintRoll />,
          text: 'Theme...',
          shortcuts: { keys: ['t', 'g'] },
        },
        {
          icon: <FiCopy />,
          text: 'Copy URL',
        },
        {
          icon: <FiCode />,
          text: 'API',
        },
        {
          icon: <FiGithub />,
          text: 'Source',
        },
      ],
    },
  ]

  const langs: Command[] = [
    {
      category: 'Language',
      commands: [
        {
          icon: <FiCode />,
          text: 'Plain Text',
        },
        {
          icon: <FiCode />,
          text: 'APL',
          perform: () => setLanguage('apl'),
        },
        {
          icon: <FiCode />,
          text: 'ASCII Armor',
          perform: () => setLanguage('asciiArmor'),
        },
        {
          icon: <FiCode />,
          text: 'Asterisk',
          perform: () => setLanguage('asterisk'),
        },
        {
          icon: <FiCode />,
          text: 'Brainfuck',
          perform: () => setLanguage('brainfuck'),
        },
        {
          icon: <FiCode />,
          text: 'C',
          perform: () => setLanguage('c'),
        },
        {
          icon: <FiCode />,
          text: 'C++',
          perform: () => setLanguage('cpp'),
        },
        {
          icon: <FiCode />,
          text: 'C#',
          perform: () => setLanguage('csharp'),
        },
        {
          icon: <FiCode />,
          text: 'Cassandra',
          perform: () => setLanguage('cassandra'),
        },
        {
          icon: <FiCode />,
          text: 'Ceylon',
          perform: () => setLanguage('ceylon'),
        },
        {
          icon: <FiCode />,
          text: 'Clojure',
          perform: () => setLanguage('clojure'),
        },
        {
          icon: <FiCode />,
          text: 'Closure Stylesheets (GSS)',
          perform: () => setLanguage('gss'),
        },
        {
          icon: <FiCode />,
          text: 'CMake',
          perform: () => setLanguage('cmake'),
        },
        {
          icon: <FiCode />,
          text: 'Cobol',
          perform: () => setLanguage('cobol'),
        },
        {
          icon: <FiCode />,
          text: 'CoffeeScript',
          perform: () => setLanguage('coffeescript'),
        },
        {
          icon: <FiCode />,
          text: 'Common Lisp',
          perform: () => setLanguage('commonLisp'),
        },
        {
          icon: <FiCode />,
          text: 'Crystal',
          perform: () => setLanguage('crystal'),
        },
        {
          icon: <FiCode />,
          text: 'CSS',
          perform: () => setLanguage('css'),
        },
        {
          icon: <FiCode />,
          text: 'Cypher',
          perform: () => setLanguage('cypher'),
        },
        {
          icon: <FiCode />,
          text: 'Cython',
          perform: () => setLanguage('cython'),
        },
        {
          icon: <FiCode />,
          text: 'D',
          perform: () => setLanguage('d'),
        },
        {
          icon: <FiCode />,
          text: 'Dart',
          perform: () => setLanguage('dart'),
        },
        {
          icon: <FiCode />,
          text: 'diff',
          perform: () => setLanguage('diff'),
        },
        {
          icon: <FiCode />,
          text: 'Dockerfile',
          perform: () => setLanguage('dockerfile'),
        },
        {
          icon: <FiCode />,
          text: 'DTD',
          perform: () => setLanguage('dtd'),
        },
        {
          icon: <FiCode />,
          text: 'Dylan',
          perform: () => setLanguage('dylan'),
        },
        {
          icon: <FiCode />,
          text: 'EBNF',
          perform: () => setLanguage('ebnf'),
        },
        {
          icon: <FiCode />,
          text: 'ECL',
          perform: () => setLanguage('ecl'),
        },
        {
          icon: <FiCode />,
          text: 'Eiffel',
          perform: () => setLanguage('eiffel'),
        },
        {
          icon: <FiCode />,
          text: 'Elm',
          perform: () => setLanguage('elm'),
        },
        {
          icon: <FiCode />,
          text: 'Erlang',
          perform: () => setLanguage('erlang'),
        },
        {
          icon: <FiCode />,
          text: 'Esper',
          perform: () => setLanguage('esper'),
        },
        {
          icon: <FiCode />,
          text: 'eZ80',
          perform: () => setLanguage('ez80'),
        },
        {
          icon: <FiCode />,
          text: 'F#',
          perform: () => setLanguage('fSharp'),
        },
        {
          icon: <FiCode />,
          text: 'Factor',
          perform: () => setLanguage('factor'),
        },
        {
          icon: <FiCode />,
          text: 'FCL',
          perform: () => setLanguage('fcl'),
        },
        {
          icon: <FiCode />,
          text: 'Forth',
          perform: () => setLanguage('forth'),
        },
        {
          icon: <FiCode />,
          text: 'Fortran',
          perform: () => setLanguage('fortran'),
        },
        {
          icon: <FiCode />,
          text: 'Gas',
          perform: () => setLanguage('gas'),
        },
        {
          icon: <FiCode />,
          text: 'Gas ARM',
          perform: () => setLanguage('gasArm'),
        },
        {
          icon: <FiCode />,
          text: 'Gherkin',
          perform: () => setLanguage('gherkin'),
        },
        {
          icon: <FiCode />,
          text: 'Go',
          perform: () => setLanguage('go'),
        },
        {
          icon: <FiCode />,
          text: 'GraphQL (gql)',
          perform: () => setLanguage('gql'),
        },
        {
          icon: <FiCode />,
          text: 'Groovy',
          perform: () => setLanguage('groovy'),
        },
        {
          icon: <FiCode />,
          text: 'GPSQL',
          perform: () => setLanguage('gpsql'),
        },
        {
          icon: <FiCode />,
          text: 'Haskell',
          perform: () => setLanguage('haskell'),
        },
        {
          icon: <FiCode />,
          text: 'Haxe',
          perform: () => setLanguage('haxe'),
        },
        {
          icon: <FiCode />,
          text: 'Hive',
          perform: () => setLanguage('hive'),
        },
        {
          icon: <FiCode />,
          text: 'HXML',
          perform: () => setLanguage('hxml'),
        },
        {
          icon: <FiCode />,
          text: 'HTML',
          perform: () => setLanguage('html'),
        },
        {
          icon: <FiCode />,
          text: 'HTTP',
          perform: () => setLanguage('http'),
        },
        {
          icon: <FiCode />,
          text: 'IDL',
          perform: () => setLanguage('idl'),
        },
        {
          icon: <FiCode />,
          text: 'Java',
          perform: () => setLanguage('java'),
        },
        {
          icon: <FiCode />,
          text: 'JavaScript',
          perform: () => setLanguage('javascript'),
        },
        {
          icon: <FiCode />,
          text: 'Jinja2',
          perform: () => setLanguage('jinja2'),
        },
        {
          icon: <FiCode />,
          text: 'JSON',
          perform: () => setLanguage('json'),
        },
        {
          icon: <FiCode />,
          text: 'JSON-LD',
          perform: () => setLanguage('jsonld'),
        },
        {
          icon: <FiCode />,
          text: 'JSX',
          perform: () => setLanguage('jsx'),
        },
        {
          icon: <FiCode />,
          text: 'Julia',
          perform: () => setLanguage('julia'),
        },
        {
          icon: <FiCode />,
          text: 'Kotlin',
          perform: () => setLanguage('kotlin'),
        },
        {
          icon: <FiCode />,
          text: 'LESS',
          perform: () => setLanguage('less'),
        },
        {
          icon: <FiCode />,
          text: 'LiveScript',
          perform: () => setLanguage('livescript'),
        },
        {
          icon: <FiCode />,
          text: 'Lua',
          perform: () => setLanguage('lua'),
        },
        {
          icon: <FiCode />,
          text: 'MariaDB SQL',
          perform: () => setLanguage('mariasql'),
        },
        {
          icon: <FiCode />,
          text: 'Markdown',
          perform: () => setLanguage('markdown'),
        },
        {
          icon: <FiCode />,
          text: 'Mathematica',
          perform: () => setLanguage('mathematica'),
        },
        {
          icon: <FiCode />,
          text: 'mbox',
          perform: () => setLanguage('mbox'),
        },
        {
          icon: <FiCode />,
          text: 'mIRC',
          perform: () => setLanguage('mirc'),
        },
        {
          icon: <FiCode />,
          text: 'Modelica',
          perform: () => setLanguage('modelica'),
        },
        {
          icon: <FiCode />,
          text: 'MscGen',
          perform: () => setLanguage('mscgen'),
        },
        {
          icon: <FiCode />,
          text: 'MsGenny',
          perform: () => setLanguage('msgenny'),
        },
        {
          icon: <FiCode />,
          text: 'MSSQL',
          perform: () => setLanguage('mssql'),
        },
        {
          icon: <FiCode />,
          text: 'MUMPS',
          perform: () => setLanguage('mumps'),
        },
        {
          icon: <FiCode />,
          text: 'MySQL',
          perform: () => setLanguage('mysql'),
        },
        {
          icon: <FiCode />,
          text: 'nesC',
          perform: () => setLanguage('nesC'),
        },
        {
          icon: <FiCode />,
          text: 'nginx',
          perform: () => setLanguage('nginx'),
        },
        {
          icon: <FiCode />,
          text: 'NSIS',
          perform: () => setLanguage('nsis'),
        },
        {
          icon: <FiCode />,
          text: 'NTriples',
          perform: () => setLanguage('ntriples'),
        },
        {
          icon: <FiCode />,
          text: 'Objective-C',
          perform: () => setLanguage('objectiveC'),
        },
        {
          icon: <FiCode />,
          text: 'Objective-C++',
          perform: () => setLanguage('objectiveCpp'),
        },
        {
          icon: <FiCode />,
          text: 'OCaml',
          perform: () => setLanguage('oCaml'),
        },
        {
          icon: <FiCode />,
          text: 'Octave',
          perform: () => setLanguage('octave'),
        },
        {
          icon: <FiCode />,
          text: 'Oz',
          perform: () => setLanguage('oz'),
        },
        {
          icon: <FiCode />,
          text: 'Pascal',
          perform: () => setLanguage('pascal'),
        },
        {
          icon: <FiCode />,
          text: 'Perl',
          perform: () => setLanguage('perl'),
        },
        {
          icon: <FiCode />,
          text: 'PostgreSQL',
          perform: () => setLanguage('pgsql'),
        },
        {
          icon: <FiCode />,
          text: 'PHP',
          perform: () => setLanguage('php'),
        },
        {
          icon: <FiCode />,
          text: 'Pig',
          perform: () => setLanguage('pig'),
        },
        {
          icon: <FiCode />,
          text: 'PLSQL',
          perform: () => setLanguage('plsql'),
        },
        {
          icon: <FiCode />,
          text: 'PowerShell',
          perform: () => setLanguage('powershell'),
        },
        {
          icon: <FiCode />,
          text: 'Properties Files',
          perform: () => setLanguage('properties'),
        },
        {
          icon: <FiCode />,
          text: 'ProtoBuf',
          perform: () => setLanguage('protobuf'),
        },
        {
          icon: <FiCode />,
          text: 'Python',
          perform: () => setLanguage('python'),
        },
        {
          icon: <FiCode />,
          text: 'Q',
          perform: () => setLanguage('q'),
        },
        {
          icon: <FiCode />,
          text: 'R',
          perform: () => setLanguage('r'),
        },
        {
          icon: <FiCode />,
          text: 'RPM Changes',
          perform: () => setLanguage('rpmChanges'),
        },
        {
          icon: <FiCode />,
          text: 'RPM Spec',
          perform: () => setLanguage('rpmSpec'),
        },
        {
          icon: <FiCode />,
          text: 'Ruby',
          perform: () => setLanguage('ruby'),
        },
        {
          icon: <FiCode />,
          text: 'Rust',
          perform: () => setLanguage('rust'),
        },
        {
          icon: <FiCode />,
          text: 'SAS',
          perform: () => setLanguage('sas'),
        },
        {
          icon: <FiCode />,
          text: 'Sass',
          perform: () => setLanguage('sass'),
        },
        {
          icon: <FiCode />,
          text: 'Scala',
          perform: () => setLanguage('scala'),
        },
        {
          icon: <FiCode />,
          text: 'Scheme',
          perform: () => setLanguage('scheme'),
        },
        {
          icon: <FiCode />,
          text: 'SCSS',
          perform: () => setLanguage('scss'),
        },
        {
          icon: <FiCode />,
          text: 'Shader',
          perform: () => setLanguage('shader'),
        },
        {
          icon: <FiCode />,
          text: 'Shell',
          perform: () => setLanguage('shell'),
        },
        {
          icon: <FiCode />,
          text: 'Sieve',
          perform: () => setLanguage('sieve'),
        },
        {
          icon: <FiCode />,
          text: 'Smalltalk',
          perform: () => setLanguage('smalltalk'),
        },
        {
          icon: <FiCode />,
          text: 'SML',
          perform: () => setLanguage('sml'),
        },
        {
          icon: <FiCode />,
          text: 'Solr',
          perform: () => setLanguage('solr'),
        },
        {
          icon: <FiCode />,
          text: 'SparkSQL',
          perform: () => setLanguage('sparkSQL'),
        },
        {
          icon: <FiCode />,
          text: 'SPARQL',
          perform: () => setLanguage('sparql'),
        },
        {
          icon: <FiCode />,
          text: 'Spreadsheet',
          perform: () => setLanguage('spreadsheet'),
        },
        {
          icon: <FiCode />,
          text: 'Stylus',
          perform: () => setLanguage('stylus'),
        },
        {
          icon: <FiCode />,
          text: 'SQL',
          perform: () => setLanguage('sql'),
        },
        {
          icon: <FiCode />,
          text: 'SQLite',
          perform: () => setLanguage('sqlite'),
        },
        {
          icon: <FiCode />,
          text: 'Squirrel',
          perform: () => setLanguage('squirrel'),
        },
        {
          icon: <FiCode />,
          text: 'sTeX',
          perform: () => setLanguage('stex'),
        },
        {
          icon: <FiCode />,
          text: 'sTeX Math',
          perform: () => setLanguage('stexMath'),
        },
        {
          icon: <FiCode />,
          text: 'Swift',
          perform: () => setLanguage('swift'),
        },
        {
          icon: <FiCode />,
          text: 'Tcl',
          perform: () => setLanguage('tcl'),
        },
        {
          icon: <FiCode />,
          text: 'Textile',
          perform: () => setLanguage('textile'),
        },
        {
          icon: <FiCode />,
          text: 'TiddlyWiki',
          perform: () => setLanguage('tiddlyWiki'),
        },
        {
          icon: <FiCode />,
          text: 'Tiki',
          perform: () => setLanguage('tiki'),
        },
        {
          icon: <FiCode />,
          text: 'TLV',
          perform: () => setLanguage('tlv'),
        },
        {
          icon: <FiCode />,
          text: 'TOML',
          perform: () => setLanguage('toml'),
        },
        {
          icon: <FiCode />,
          text: 'troff',
          perform: () => setLanguage('troff'),
        },
        {
          icon: <FiCode />,
          text: 'TSX',
          perform: () => setLanguage('tsx'),
        },
        {
          icon: <FiCode />,
          text: 'TTCN',
          perform: () => setLanguage('ttcn'),
        },
        {
          icon: <FiCode />,
          text: 'TTCN_CFG',
          perform: () => setLanguage('ttcnCfg'),
        },
        {
          icon: <FiCode />,
          text: 'Turtle',
          perform: () => setLanguage('turtle'),
        },
        {
          icon: <FiCode />,
          text: 'TypeScript',
          perform: () => setLanguage('typescript'),
        },
        {
          icon: <FiCode />,
          text: 'Visual Basic',
          perform: () => setLanguage('vb'),
        },
        {
          icon: <FiCode />,
          text: 'VB.NET',
          perform: () => setLanguage('vbScriptASP'),
        },
        {
          icon: <FiCode />,
          text: 'VBScript',
          perform: () => setLanguage('vbscript'),
        },
        {
          icon: <FiCode />,
          text: 'Velocity',
          perform: () => setLanguage('velocity'),
        },
        {
          icon: <FiCode />,
          text: 'Verilog',
          perform: () => setLanguage('verilog'),
        },
        {
          icon: <FiCode />,
          text: 'VHDL',
          perform: () => setLanguage('vhdl'),
        },
        {
          icon: <FiCode />,
          text: 'Wast',
          perform: () => setLanguage('wast'),
        },
        {
          icon: <FiCode />,
          text: 'Web IDL',
          perform: () => setLanguage('webIDL'),
        },
        {
          icon: <FiCode />,
          text: 'XML',
          perform: () => setLanguage('xml'),
        },
        {
          icon: <FiCode />,
          text: 'XQuery',
          perform: () => setLanguage('xQuery'),
        },
        {
          icon: <FiCode />,
          text: 'Xu',
          perform: () => setLanguage('xu'),
        },
        {
          icon: <FiCode />,
          text: 'Yacas',
          perform: () => setLanguage('yacas'),
        },
        {
          icon: <FiCode />,
          text: 'YAML',
          perform: () => setLanguage('yaml'),
        },
        {
          icon: <FiCode />,
          text: 'Z80',
          perform: () => setLanguage('z80'),
        },
      ],
    },
  ]

  const [mainCommands] = useCommands(main)
  const [languageCommands] = useCommands(langs)

  if (!mounted) return null
  return (
    <>
      <CommandMenu commands={mainCommands} index={1} main />
      <CommandMenu commands={languageCommands} index={2} />
    </>
  )
}

export default Palette
