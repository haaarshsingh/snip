import { Command, CommandMenu, useCommands, useKmenu } from 'kmenu'
import { FC } from 'react'
import {
  FiCode,
  FiCopy,
  FiDownloadCloud,
  FiGithub,
  FiGitlab,
  FiLogOut,
  FiMoon,
  FiPlus,
  FiShare2,
  FiSun,
  FiUser,
} from 'react-icons/fi'
import { BiPaintRoll } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'

const Palette: FC<{ snip: definitions['snips'] }> = ({ snip }) => {
  const [input, setInput, open, setOpen] = useKmenu()
  const { setTheme } = useTheme()
  const user = supabase.auth.user()

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
          href: user ? `/user/${user?.id}` : undefined,
        },
        {
          icon: user ? <FiLogOut /> : <FiGitlab />,
          text: user ? 'Logout' : 'Continue With GitLab',
          perform: user
            ? () => supabase.auth.signOut()
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
          icon: <FiPlus />,
          text: 'New Snip',
          href: 'https://snip.au/',
        },
        {
          icon: <FiCopy />,
          text: 'Copy Snip',
          perform: () => navigator.clipboard.writeText(snip.code),
        },
        {
          icon: <FiShare2 />,
          text: 'Copy URL',
          perform: () =>
            navigator.clipboard.writeText(`https://snip.au/${snip.id}`),
        },
        {
          icon: <FiDownloadCloud />,
          text: 'Download Snip',
          href: `data:application/octet-stream,${encodeURIComponent(
            snip.code
          )}`,
        },
      ],
    },
    {
      category: 'General',
      commands: [
        {
          icon: <BiPaintRoll />,
          text: 'Theme...',
        },
        {
          icon: <FiCode />,
          text: 'API',
          href: '/api',
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
