import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
} from 'kmenu'
import { FC } from 'react'
import {
  FiCode,
  FiCopy,
  FiGithub,
  FiLogOut,
  FiMoon,
  FiPlus,
  FiSun,
} from 'react-icons/fi'
import { BiPaintRoll } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import supabase from '@lib/supabase'

const Palette: FC = () => {
  const { setOpen } = useKmenu()
  const { setTheme } = useTheme()

  const main: Command[] = [
    {
      category: 'Account',
      commands: [
        {
          icon: <FiLogOut />,
          text: 'Logout',
          perform: async () => {
            await supabase.auth.signOut()
            window.location.reload()
          },
        },
      ],
    },
    {
      category: 'General',
      commands: [
        {
          icon: <FiPlus />,
          text: 'New Snip',
          href: 'https://snip.place/',
        },
        {
          icon: <BiPaintRoll />,
          text: 'Theme...',
          keywords: 'dark light mode themes',
          perform: () => setOpen(2),
        },
        {
          icon: <FiCopy />,
          text: 'Copy URL',
          perform: () =>
            navigator.clipboard.writeText('https://snip.place/snips'),
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

  const [mainCommands] = useCommands(main)
  const [themeCommands] = useCommands(themes)

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} index={1} crumbs={['Home']} />
      <CommandMenu
        commands={themeCommands}
        index={2}
        crumbs={['Home', 'Theme']}
        placeholder='Theme...'
      />
    </CommandWrapper>
  )
}

export default Palette
