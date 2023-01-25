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
import toast from 'react-hot-toast'
import {
  promiseIconTheme,
  promiseIconThemeDark,
  promiseStyle,
  promiseStyleDark,
} from '@css/toast'
import { CategoryCommand } from 'kmenu/dist/types'

const Palette: FC<{
  snip: definitions['snips']
  user: User | null
}> = ({ snip, user }) => {
  const [input, setInput, open, setOpen] = useKmenu()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const utilityCommands: CategoryCommand[] = [
    {
      icon: <FiPlus />,
      text: 'New Snip',
      href: 'https://snip.place/',
      shortcuts: { keys: ['n'] },
    },
    {
      icon: <FiCopy />,
      text: 'Copy Snip',
      perform: () => navigator.clipboard.writeText(snip.code),
      shortcuts: { keys: ['c', 's'] },
    },
    {
      icon: <FiShare2 />,
      text: 'Copy URL',
      perform: () =>
        navigator.clipboard.writeText(`https://snip.place/${snip.id}`),
      shortcuts: { keys: ['c', 'u'] },
    },
    {
      icon: <FiDownloadCloud />,
      text: 'Download Snip',
      href: `data:application/octet-stream,${encodeURIComponent(snip.code)}`,
      shortcuts: { modifier: 'ctrl', keys: ['d'] },
    },
  ]

  const utilityCommandsOwner: CategoryCommand[] = [
    {
      icon: <FiEdit />,
      text: 'Edit Snip',
      href: `https://snip.place/edit/${snip.id}`,
      shortcuts: { keys: ['e'] },
    },
    {
      icon: <FiTrash />,
      text: 'Delete Snip',
      perform: () => setOpen(3),
      shortcuts: { keys: ['d', 'l'] },
    },
    ...utilityCommands,
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
      commands:
        user?.id === snip.user_id ? utilityCommandsOwner : utilityCommands,
    },
    {
      category: 'General',
      commands: [
        {
          icon: <BiPaintRoll />,
          text: 'Theme...',
          keywords: 'dark light mode themes',
          perform: () => setOpen(6),
          shortcuts: { modifier: 'alt', keys: ['t'] },
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

  const confirm: Command[] = [
    {
      category: 'Options',
      commands: [
        {
          icon: <FiCheck />,
          text: 'Confirm',
          perform: async () => {
            const response = fetch(`/api/snip_delete`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${snip.user_id!}` },
              body: JSON.stringify({ id: snip.id }),
            }).then((res) => res.status === 200 && router.push('/'))

            toast.promise(
              response,
              {
                loading: 'Loading',
                success: 'Deleted Snip!',
                error: 'Error Deleting Snip!',
              },
              {
                style: theme === 'dark' ? promiseStyleDark : promiseStyle,
                iconTheme:
                  theme === 'dark' ? promiseIconThemeDark : promiseIconTheme,
              }
            )
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
      <CommandMenu commands={themeCommands} index={2} placeholder="Theme..." />
      <CommandMenu
        commands={confirmCommands}
        index={3}
        placeholder="Delete snip..?"
      />
    </>
  )
}

export default Palette
