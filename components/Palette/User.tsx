import { Command, CommandMenu, useCommands, useKmenu } from 'kmenu'
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
import { useUser } from '@lib/UserContext'

const Palette: FC = () => {
  const [input, setInput, open, setOpen] = useKmenu()
  const { setTheme } = useTheme()
  const { logout } = useUser()

  const main: Command[] = [
    {
      category: 'Account',
      commands: [
        {
          icon: <FiLogOut />,
          text: 'Logout',
          perform: async () => {
            logout()
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
          shortcuts: { keys: ['n'] },
        },
        {
          icon: <BiPaintRoll />,
          text: 'Theme...',
          keywords: 'dark light mode themes',
          perform: () => setOpen(2),
          shortcuts: { modifier: 'alt', keys: ['t'] },
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
    <>
      <CommandMenu commands={mainCommands} index={1} main />
      <CommandMenu commands={themeCommands} index={2} placeholder='Theme...' />
    </>
  )
}

export default Palette
