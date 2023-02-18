import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
} from 'kmenu'
import { Dispatch, FC, SetStateAction } from 'react'
import {
  FiArrowLeft,
  FiCode,
  FiCopy,
  FiGithub,
  FiGitlab,
  FiLock,
  FiLogOut,
  FiMoon,
  FiPlus,
  FiRefreshCcw,
  FiSun,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { BiPaintRoll } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import langs from '@lib/languages'
import { nanoid } from 'nanoid'
import supabase from '@lib/supabase'
import { User } from '@supabase/supabase-js'

const Palette: FC<{
  user: User | null
  create: () => void
  setPassword: Dispatch<SetStateAction<string | null>>
  setLanguage: Dispatch<SetStateAction<keyof typeof langs | undefined>>
}> = ({ user, setPassword, setLanguage }) => {
  const { input, open, setOpen } = useKmenu()
  const { setTheme } = useTheme()

  const main: Command[] = [
    {
      category: 'Account',
      commands: [
        {
          icon: user ? <FiUser /> : <FiGithub />,
          text: user ? 'View Snips' : 'Continue With GitHub',
          perform: user
            ? undefined
            : async () =>
                await supabase.auth.signIn({
                  provider: 'github',
                }),
          href: user ? `/user/${user.id}` : undefined,
        },
        {
          icon: user ? <FiLogOut /> : <FiGitlab />,
          text: user ? 'Logout' : 'Continue With GitLab',
          perform: user
            ? async () => {
                await supabase.auth.signOut()
                window.location.reload()
              }
            : async () =>
                await supabase.auth.signIn({
                  provider: 'gitlab',
                }),
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
          icon: <FiLock />,
          text: 'Encrypt...',
          perform: () => setOpen(3),
          keywords: 'password',
        },
      ],
    },
    {
      category: 'General',
      commands: [
        {
          icon: <BiPaintRoll />,
          text: 'Theme...',
          keywords: 'dark light mode themes',
          perform: () => setOpen(6),
        },
        {
          icon: <FiCopy />,
          text: 'Copy URL',
          perform: () => navigator.clipboard.writeText('https://snip.hxrsh.in'),
        },
        {
          icon: <FiCode />,
          text: 'API',
          href: 'https://github.com/harshhhdev/snip/blob/main/API.md',
          newTab: true,
        },
        {
          icon: <FiGithub />,
          text: 'Source',
          href: 'https://github.com/harshhhdev/snip',
          newTab: true,
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
          perform: () => setLanguage(undefined),
        },
        {
          icon: <FiCode />,
          text: 'APL',
          perform: () => setLanguage('APL'),
        },
        {
          icon: <FiCode />,
          text: 'ASCII Armor',
          perform: () => setLanguage('ASCII Armor'),
        },
        {
          icon: <FiCode />,
          text: 'Asterisk',
          perform: () => setLanguage('Asterisk'),
        },
        {
          icon: <FiCode />,
          text: 'Brainfuck',
          perform: () => setLanguage('Brainfuck'),
        },
        {
          icon: <FiCode />,
          text: 'C',
          perform: () => setLanguage('C'),
        },
        {
          icon: <FiCode />,
          text: 'C++',
          perform: () => setLanguage('C++'),
        },
        {
          icon: <FiCode />,
          text: 'C#',
          perform: () => setLanguage('C#'),
        },
        {
          icon: <FiCode />,
          text: 'Cassandra',
          perform: () => setLanguage('Cassandra'),
        },
        {
          icon: <FiCode />,
          text: 'Ceylon',
          perform: () => setLanguage('Ceylon'),
        },
        {
          icon: <FiCode />,
          text: 'Clojure',
          perform: () => setLanguage('Clojure'),
        },
        {
          icon: <FiCode />,
          text: 'Closure Stylesheets (GSS)',
          perform: () => setLanguage('Closure Stylesheets (GSS)'),
        },
        {
          icon: <FiCode />,
          text: 'CMake',
          perform: () => setLanguage('CMake'),
        },
        {
          icon: <FiCode />,
          text: 'Cobol',
          perform: () => setLanguage('Cobol'),
        },
        {
          icon: <FiCode />,
          text: 'CoffeeScript',
          perform: () => setLanguage('CoffeeScript'),
        },
        {
          icon: <FiCode />,
          text: 'Common Lisp',
          perform: () => setLanguage('CommonLisp'),
        },
        {
          icon: <FiCode />,
          text: 'Crystal',
          perform: () => setLanguage('Crystal'),
        },
        {
          icon: <FiCode />,
          text: 'CSS',
          perform: () => setLanguage('CSS'),
        },
        {
          icon: <FiCode />,
          text: 'Cypher',
          perform: () => setLanguage('Cypher'),
        },
        {
          icon: <FiCode />,
          text: 'Cython',
          perform: () => setLanguage('Cython'),
        },
        {
          icon: <FiCode />,
          text: 'D',
          perform: () => setLanguage('D'),
        },
        {
          icon: <FiCode />,
          text: 'Dart',
          perform: () => setLanguage('Dart'),
        },
        {
          icon: <FiCode />,
          text: 'diff',
          perform: () => setLanguage('diff'),
        },
        {
          icon: <FiCode />,
          text: 'Dockerfile',
          perform: () => setLanguage('Dockerfile'),
        },
        {
          icon: <FiCode />,
          text: 'DTD',
          perform: () => setLanguage('DTD'),
        },
        {
          icon: <FiCode />,
          text: 'Dylan',
          perform: () => setLanguage('Dylan'),
        },
        {
          icon: <FiCode />,
          text: 'EBNF',
          perform: () => setLanguage('EBNF'),
        },
        {
          icon: <FiCode />,
          text: 'ECL',
          perform: () => setLanguage('ECL'),
        },
        {
          icon: <FiCode />,
          text: 'Eiffel',
          perform: () => setLanguage('Eiffel'),
        },
        {
          icon: <FiCode />,
          text: 'Elm',
          perform: () => setLanguage('Elm'),
        },
        {
          icon: <FiCode />,
          text: 'Erlang',
          perform: () => setLanguage('Erlang'),
        },
        {
          icon: <FiCode />,
          text: 'Esper',
          perform: () => setLanguage('Esper'),
        },
        {
          icon: <FiCode />,
          text: 'eZ80',
          perform: () => setLanguage('eZ80'),
        },
        {
          icon: <FiCode />,
          text: 'F#',
          perform: () => setLanguage('F#'),
        },
        {
          icon: <FiCode />,
          text: 'Factor',
          perform: () => setLanguage('Factor'),
        },
        {
          icon: <FiCode />,
          text: 'FCL',
          perform: () => setLanguage('FCL'),
        },
        {
          icon: <FiCode />,
          text: 'Forth',
          perform: () => setLanguage('Forth'),
        },
        {
          icon: <FiCode />,
          text: 'Fortran',
          perform: () => setLanguage('Fortran'),
        },
        {
          icon: <FiCode />,
          text: 'Gas',
          perform: () => setLanguage('Gas'),
        },
        {
          icon: <FiCode />,
          text: 'Gas ARM',
          perform: () => setLanguage('Gas ARM'),
        },
        {
          icon: <FiCode />,
          text: 'Gherkin',
          perform: () => setLanguage('Gherkin'),
        },
        {
          icon: <FiCode />,
          text: 'Go',
          perform: () => setLanguage('Go'),
        },
        {
          icon: <FiCode />,
          text: 'GraphQL (gql)',
          perform: () => setLanguage('GraphQL (gql)'),
        },
        {
          icon: <FiCode />,
          text: 'Groovy',
          perform: () => setLanguage('Groovy'),
        },
        {
          icon: <FiCode />,
          text: 'GPSQL',
          perform: () => setLanguage('GPSQL'),
        },
        {
          icon: <FiCode />,
          text: 'Haskell',
          perform: () => setLanguage('Haskell'),
        },
        {
          icon: <FiCode />,
          text: 'Haxe',
          perform: () => setLanguage('Haxe'),
        },
        {
          icon: <FiCode />,
          text: 'Hive',
          perform: () => setLanguage('Hive'),
        },
        {
          icon: <FiCode />,
          text: 'HXML',
          perform: () => setLanguage('HXML'),
        },
        {
          icon: <FiCode />,
          text: 'HTML',
          perform: () => setLanguage('HTML'),
        },
        {
          icon: <FiCode />,
          text: 'HTTP',
          perform: () => setLanguage('HTTP'),
        },
        {
          icon: <FiCode />,
          text: 'IDL',
          perform: () => setLanguage('IDL'),
        },
        {
          icon: <FiCode />,
          text: 'Java',
          perform: () => setLanguage('Java'),
        },
        {
          icon: <FiCode />,
          text: 'JavaScript',
          perform: () => setLanguage('JavaScript'),
        },
        {
          icon: <FiCode />,
          text: 'Jinja2',
          perform: () => setLanguage('Jinja2'),
        },
        {
          icon: <FiCode />,
          text: 'JSON',
          perform: () => setLanguage('JSON'),
        },
        {
          icon: <FiCode />,
          text: 'JSON-LD',
          perform: () => setLanguage('JSON-LD'),
        },
        {
          icon: <FiCode />,
          text: 'JSX',
          perform: () => setLanguage('JSX'),
        },
        {
          icon: <FiCode />,
          text: 'Julia',
          perform: () => setLanguage('Julia'),
        },
        {
          icon: <FiCode />,
          text: 'Kotlin',
          perform: () => setLanguage('Kotlin'),
        },
        {
          icon: <FiCode />,
          text: 'LESS',
          perform: () => setLanguage('LESS'),
        },
        {
          icon: <FiCode />,
          text: 'LiveScript',
          perform: () => setLanguage('LiveScript'),
        },
        {
          icon: <FiCode />,
          text: 'Lua',
          perform: () => setLanguage('Lua'),
        },
        {
          icon: <FiCode />,
          text: 'MariaDB SQL',
          perform: () => setLanguage('MariaDB SQL'),
        },
        {
          icon: <FiCode />,
          text: 'Markdown',
          perform: () => setLanguage('Markdown'),
        },
        {
          icon: <FiCode />,
          text: 'Mathematica',
          perform: () => setLanguage('Mathematica'),
        },
        {
          icon: <FiCode />,
          text: 'mbox',
          perform: () => setLanguage('mbox'),
        },
        {
          icon: <FiCode />,
          text: 'mIRC',
          perform: () => setLanguage('mIRC'),
        },
        {
          icon: <FiCode />,
          text: 'Modelica',
          perform: () => setLanguage('Modelica'),
        },
        {
          icon: <FiCode />,
          text: 'MscGen',
          perform: () => setLanguage('MscGen'),
        },
        {
          icon: <FiCode />,
          text: 'MsGenny',
          perform: () => setLanguage('MsGenny'),
        },
        {
          icon: <FiCode />,
          text: 'MSSQL',
          perform: () => setLanguage('MSSQL'),
        },
        {
          icon: <FiCode />,
          text: 'MUMPS',
          perform: () => setLanguage('Mumps'),
        },
        {
          icon: <FiCode />,
          text: 'MySQL',
          perform: () => setLanguage('MySQL'),
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
          perform: () => setLanguage('NSIS'),
        },
        {
          icon: <FiCode />,
          text: 'NTriples',
          perform: () => setLanguage('NTriples'),
        },
        {
          icon: <FiCode />,
          text: 'Objective-C',
          perform: () => setLanguage('Objective-C'),
        },
        {
          icon: <FiCode />,
          text: 'Objective-C++',
          perform: () => setLanguage('Objective C++'),
        },
        {
          icon: <FiCode />,
          text: 'OCaml',
          perform: () => setLanguage('oCaml'),
        },
        {
          icon: <FiCode />,
          text: 'Octave',
          perform: () => setLanguage('Octave'),
        },
        {
          icon: <FiCode />,
          text: 'Oz',
          perform: () => setLanguage('Oz'),
        },
        {
          icon: <FiCode />,
          text: 'Pascal',
          perform: () => setLanguage('Pascal'),
        },
        {
          icon: <FiCode />,
          text: 'Perl',
          perform: () => setLanguage('Perl'),
        },
        {
          icon: <FiCode />,
          text: 'PostgreSQL',
          perform: () => setLanguage('PostgreSQL'),
        },
        {
          icon: <FiCode />,
          text: 'PHP',
          perform: () => setLanguage('PHP'),
        },
        {
          icon: <FiCode />,
          text: 'Pig',
          perform: () => setLanguage('Pig'),
        },
        {
          icon: <FiCode />,
          text: 'PLSQL',
          perform: () => setLanguage('PLSQL'),
        },
        {
          icon: <FiCode />,
          text: 'PowerShell',
          perform: () => setLanguage('PowerShell'),
        },
        {
          icon: <FiCode />,
          text: 'Properties Files',
          perform: () => setLanguage('Properties'),
        },
        {
          icon: <FiCode />,
          text: 'ProtoBuf',
          perform: () => setLanguage('Protobuf'),
        },
        {
          icon: <FiCode />,
          text: 'Python',
          perform: () => setLanguage('Python'),
        },
        {
          icon: <FiCode />,
          text: 'Q',
          perform: () => setLanguage('Q'),
        },
        {
          icon: <FiCode />,
          text: 'R',
          perform: () => setLanguage('R'),
        },
        {
          icon: <FiCode />,
          text: 'RPM Changes',
          perform: () => setLanguage('RPM Changes'),
        },
        {
          icon: <FiCode />,
          text: 'RPM',
          perform: () => setLanguage('RPM'),
        },
        {
          icon: <FiCode />,
          text: 'Ruby',
          perform: () => setLanguage('Ruby'),
        },
        {
          icon: <FiCode />,
          text: 'Rust',
          perform: () => setLanguage('Rust'),
        },
        {
          icon: <FiCode />,
          text: 'SAS',
          perform: () => setLanguage('Sas'),
        },
        {
          icon: <FiCode />,
          text: 'Sass',
          perform: () => setLanguage('Sass'),
        },
        {
          icon: <FiCode />,
          text: 'Scala',
          perform: () => setLanguage('Scala'),
        },
        {
          icon: <FiCode />,
          text: 'Scheme',
          perform: () => setLanguage('Scheme'),
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
          perform: () => setLanguage('Shell'),
        },
        {
          icon: <FiCode />,
          text: 'Sieve',
          perform: () => setLanguage('Sieve'),
        },
        {
          icon: <FiCode />,
          text: 'Smalltalk',
          perform: () => setLanguage('Smalltalk'),
        },
        {
          icon: <FiCode />,
          text: 'SML',
          perform: () => setLanguage('SML'),
        },
        {
          icon: <FiCode />,
          text: 'Solr',
          perform: () => setLanguage('Solr'),
        },
        {
          icon: <FiCode />,
          text: 'SparkSQL',
          perform: () => setLanguage('SparkSQL'),
        },
        {
          icon: <FiCode />,
          text: 'SPARQL',
          perform: () => setLanguage('SPARQL'),
        },
        {
          icon: <FiCode />,
          text: 'Spreadsheet',
          perform: () => setLanguage('Spreadsheet'),
        },
        {
          icon: <FiCode />,
          text: 'Stylus',
          perform: () => setLanguage('Stylus'),
        },
        {
          icon: <FiCode />,
          text: 'SQL',
          perform: () => setLanguage('SQL'),
        },
        {
          icon: <FiCode />,
          text: 'SQLite',
          perform: () => setLanguage('SQLite'),
        },
        {
          icon: <FiCode />,
          text: 'Squirrel',
          perform: () => setLanguage('Squirrel'),
        },
        {
          icon: <FiCode />,
          text: 'sTeX',
          perform: () => setLanguage('sTeX'),
        },
        {
          icon: <FiCode />,
          text: 'sTeX Math',
          perform: () => setLanguage('sTeX Math'),
        },
        {
          icon: <FiCode />,
          text: 'Swift',
          perform: () => setLanguage('Swift'),
        },
        {
          icon: <FiCode />,
          text: 'Tcl',
          perform: () => setLanguage('Tcl'),
        },
        {
          icon: <FiCode />,
          text: 'Textile',
          perform: () => setLanguage('Textile'),
        },
        {
          icon: <FiCode />,
          text: 'TiddlyWiki',
          perform: () => setLanguage('TiddlyWiki'),
        },
        {
          icon: <FiCode />,
          text: 'Tiki',
          perform: () => setLanguage('Tiki'),
        },
        {
          icon: <FiCode />,
          text: 'TLV',
          perform: () => setLanguage('TLV'),
        },
        {
          icon: <FiCode />,
          text: 'TOML',
          perform: () => setLanguage('TOML'),
        },
        {
          icon: <FiCode />,
          text: 'troff',
          perform: () => setLanguage('Troff'),
        },
        {
          icon: <FiCode />,
          text: 'TSX',
          perform: () => setLanguage('TSX'),
        },
        {
          icon: <FiCode />,
          text: 'TTCN',
          perform: () => setLanguage('TTCN'),
        },
        {
          icon: <FiCode />,
          text: 'TTCN_CFG',
          perform: () => setLanguage('TTCN_CFG'),
        },
        {
          icon: <FiCode />,
          text: 'Turtle',
          perform: () => setLanguage('Turtle'),
        },
        {
          icon: <FiCode />,
          text: 'TypeScript',
          perform: () => setLanguage('TypeScript'),
        },
        {
          icon: <FiCode />,
          text: 'Visual Basic',
          perform: () => setLanguage('Visual Basic'),
        },
        {
          icon: <FiCode />,
          text: 'VB.NET',
          perform: () => setLanguage('VB.NET'),
        },
        {
          icon: <FiCode />,
          text: 'VBScript',
          perform: () => setLanguage('VBScript'),
        },
        {
          icon: <FiCode />,
          text: 'Velocity',
          perform: () => setLanguage('Velocity'),
        },
        {
          icon: <FiCode />,
          text: 'Verilog',
          perform: () => setLanguage('Verilog'),
        },
        {
          icon: <FiCode />,
          text: 'VHDL',
          perform: () => setLanguage('VHDL'),
        },
        {
          icon: <FiCode />,
          text: 'Wast',
          perform: () => setLanguage('WAST'),
        },
        {
          icon: <FiCode />,
          text: 'Web IDL',
          perform: () => setLanguage('Web IDL'),
        },
        {
          icon: <FiCode />,
          text: 'XML',
          perform: () => setLanguage('XML'),
        },
        {
          icon: <FiCode />,
          text: 'XQuery',
          perform: () => setLanguage('xQuery'),
        },
        {
          icon: <FiCode />,
          text: 'Xu',
          perform: () => setLanguage('Xu'),
        },
        {
          icon: <FiCode />,
          text: 'Yacas',
          perform: () => setLanguage('Yacas'),
        },
        {
          icon: <FiCode />,
          text: 'YAML',
          perform: () => setLanguage('YAML'),
        },
        {
          icon: <FiCode />,
          text: 'Z80',
          perform: () => setLanguage('Z80'),
        },
      ],
    },
  ]

  const editPassword: Command[] = [
    {
      category: 'Options',
      commands: [
        {
          text: 'Back',
          icon: <FiArrowLeft />,
          perform: () => setOpen(1),
        },
        {
          text: 'Generate Password',
          icon: <FiRefreshCcw />,
          perform: () => setPassword(nanoid(20)),
        },
        {
          text: 'Cancel',
          icon: <FiX />,
          perform: () => setOpen(0),
        },
      ],
    },
  ]

  const themes: Command[] = [
    {
      category: 'Themes',
      commands: [
        {
          icon: <FiSun />,
          text: 'Light',
          perform: () => setTheme('light'),
        },
        {
          icon: <FiMoon />,
          text: 'Dark',
          perform: () => setTheme('dark'),
        },
      ],
    },
  ]

  useEffect(() => {
    if (open === 4) setPassword(input)
  }, [open, input, setPassword])

  const [mainCommands] = useCommands(main)
  const [languageCommands] = useCommands(langs)
  const [editPasswordCommands] = useCommands(editPassword)
  const [themeCommands] = useCommands(themes)

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} index={1} crumbs={['Home']} />
      <CommandMenu
        commands={languageCommands}
        index={2}
        crumbs={['Home', 'Language']}
        placeholder='Language...'
      />
      <CommandMenu
        commands={editPasswordCommands}
        index={3}
        crumbs={['Home', 'Encrypt']}
        placeholder='New Password...'
        preventSearch
      />
      <CommandMenu
        commands={themeCommands}
        index={4}
        crumbs={['Home', 'Theme']}
        placeholder='Theme...'
        preventSearch
      />
    </CommandWrapper>
  )
}

export default Palette
