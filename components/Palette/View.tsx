import { Command, CommandMenu, useCommands, useKmenu } from 'kmenu'
import { FC } from 'react'
import {
  FiCheck,
  FiCode,
  FiCopy,
  FiDownloadCloud,
  FiEdit,
  FiGithub,
  FiGitlab,
  FiLogOut,
  FiMoon,
  FiPlus,
  FiShare2,
  FiSun,
  FiTrash,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { BiPaintRoll } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

const Palette: FC<{ snip: definitions['snips']; user: User | null }> = ({
  snip,
  user,
}) => {
  const [input, setInput, open, setOpen] = useKmenu()
  const { setTheme } = useTheme()
  const router = useRouter()

  const utilityCommands = [
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
      href: `data:application/octet-stream,${encodeURIComponent(snip.code)}`,
    },
  ]

  const utilityCommandsOwner = [
    {
      icon: <FiEdit />,
      text: 'Edit Snip',
      href: `https://snip.place/edit/${snip.id}`,
    },
    {
      icon: <FiTrash />,
      text: 'Delete Snip',
      perform: () => setOpen(3),
    },
    {
      icon: <FiPlus />,
      text: 'New Snip',
      href: 'https://snip.place/',
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
      href: `data:application/octet-stream,${encodeURIComponent(snip.code)}`,
    },
  ]

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
          href: user ? '/snips' : undefined,
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
      commands:
        user?.id === snip.user_id ? utilityCommandsOwner : utilityCommands,
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

  const confirm: Command[] = [
    {
      category: 'Options',
      commands: [
        {
          icon: <FiCheck />,
          text: 'Confirm',
          perform: async () => {
            fetch(`/api/snip_delete?id=${snip.id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${snip.user_id!}` },
            }).then((res) => {
              if (res.status === 200) router.push('/')
              console.log('failed')
            })
          },
        },
        {
          icon: <FiX />,
          text: 'Cancel',
          perform: () => setOpen(0),
        },
      ],
    },
  ]

  const [mainCommands] = useCommands(main)
  const [themeCommands] = useCommands(themes)
  const [confirmCommands] = useCommands(confirm)

  return (
    <>
      <CommandMenu commands={mainCommands} index={1} main />
      <CommandMenu commands={themeCommands} index={2} placeholder='Theme...' />
      <CommandMenu
        commands={confirmCommands}
        index={3}
        placeholder='Delete snip..?'
      />
    </>
  )
}

export default Palette
