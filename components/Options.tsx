import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import {
  FiCopy,
  FiDownloadCloud,
  FiEdit,
  FiEdit2,
  FiLoader,
  FiLock,
  FiShare,
  FiTrash,
} from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useKmenu } from 'kmenu'
import { definitions } from '@typings/supabase'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { iconTheme, style } from '@css/toast'
import clsx from 'clsx'
import { User } from '@supabase/supabase-js'

type Option = {
  icon: ReactNode
  text: string
  index?: number
  disabled?: boolean
}

const Options: FC<{
  create: () => void
  edit?: boolean
  loading: boolean
  password?: boolean | undefined
  setPassword?: Dispatch<SetStateAction<boolean | undefined>>
  user?: User | null
}> = ({ create, edit, loading, password, setPassword, user }) => {
  const options: Option[] = [
    {
      text: 'Encrypt Snip',
      icon: <FiLock size={16} />,
      disabled: user ? false : true,
    },
    { text: 'Edit Slug', icon: <FiEdit2 size={16} />, index: 3 },
  ]

  return (
    <div className='mt-5 bg-white shadow-custom dark:bg-gray-800 flex items-center justify-between p-3 rounded text-xl'>
      <div className='flex items-center'>
        {edit
          ? null
          : options.map((command, index) => (
              <Option
                {...command}
                key={index}
                password={password}
                setPassword={setPassword}
              />
            ))}
      </div>
      <div>
        {loading ? (
          <button className='flex items-center text-sm bg-gray-200 dark:bg-[#272727] border border-gray-500 text-gray-500 cursor-not-allowed py-3 px-4 rounded font-medium transition-colors'>
            <FiLoader className='text-xl mr-2 animate-spin' />
            {edit ? 'Save Snip' : 'Create Snip'}
          </button>
        ) : (
          <CreateSnip
            create={create}
            text={edit ? 'Save Snip' : 'Create Snip'}
          />
        )}
      </div>
    </div>
  )
}

export const ViewOptions: FC<{
  snip: definitions['snips']
  owner: boolean
}> = ({ snip, owner }) => {
  // Avoid SVG hydration errors with Next.js
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const options = [
    {
      text: 'Copy Snip',
      icon: <FiCopy size={16} />,
      perform: () => {
        toast.success('Copied Snip', {
          style: style,
          iconTheme: iconTheme,
        })

        navigator.clipboard.writeText(snip.code)
      },
    },
    {
      text: 'Copy URL',
      icon: <FiShare size={16} />,
      perform: () => {
        toast.success('Copied URL', {
          style: style,
          iconTheme: iconTheme,
        })

        navigator.clipboard.writeText(`https://snip.place/${snip.id}`)
      },
    },
    {
      text: 'Download Snip',
      icon: <FiDownloadCloud size={16} />,
      perform: () =>
        window.open(
          `data:application/octet-stream,${encodeURIComponent(snip.code)}`
        ),
    },
  ]

  const ownerOptions = [
    {
      text: 'Edit Snip',
      icon: <FiEdit size={16} />,
      perform: () => window.open(`https://snip.place/edit/${snip.id}`),
    },
    {
      text: 'Delete Snip',
      icon: <FiTrash size={16} />,
      index: 3,
    },
    {
      text: 'Copy Snip',
      icon: <FiCopy size={16} />,
      perform: () => {
        toast.success('Copied Snip', {
          style: style,
          iconTheme: iconTheme,
        })

        navigator.clipboard.writeText(snip.code)
      },
    },
    {
      text: 'Copy URL',
      icon: <FiShare size={16} />,
      perform: () => {
        toast.success('Copied URL', {
          style: style,
          iconTheme: iconTheme,
        })

        navigator.clipboard.writeText(`https://snip.place/${snip.id}`)
      },
    },
    {
      text: 'Download Snip',
      icon: <FiDownloadCloud size={16} />,
      perform: () =>
        window.open(
          `data:application/octet-stream,${encodeURIComponent(snip.code)}`
        ),
    },
  ]

  return (
    <div className='mt-10 bg-white shadow-custom dark:bg-gray-800 flex items-center justify-between p-5 rounded text-xl'>
      <div className='flex items-center'>
        {owner
          ? ownerOptions.map((command, index) => (
              <Option {...command} key={index} />
            ))
          : options.map((command, index) => (
              <Option {...command} key={index} />
            ))}
      </div>
      <div>
        <Link href='/' passHref>
          <a className='text-sm bg-gray-200 dark:bg-gray-700 hover:bg-[#dbdbdb] active:bg-[#cecece] dark:hover:bg-gray-600 py-3 px-4 rounded font-medium transition-colors'>
            New Snip
          </a>
        </Link>
      </div>
    </div>
  )
}

const Option: FC<
  Option & {
    password?: boolean | undefined
    setPassword?: Dispatch<SetStateAction<boolean | undefined>>
  }
> = (command) => {
  const { setOpen: setKmenu } = useKmenu()
  const [open, setOpen] = useState(false)

  return (
    <button
      className={`mx-2 text-gray-300 dark:text-gray-500 dark:hover:text-gray-300 hover:text-black transition-colors flex justify-center ${clsx(
        command.disabled && 'cursor-not-allowed !text-gray-700',
        command.password && !command.index && '!text-white'
      )}`}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      disabled={command.disabled}
      aria-disabled={command.disabled}
      aria-label={command.text}
      onClick={() =>
        command.setPassword
          ? command.setPassword((a) => !a)
          : setKmenu(command.index!)
      }>
      <AnimatePresence>
        {open && (
          <motion.div
            className='absolute block text-xs -mt-12 bg-gray-200 border border-gray-300 dark:border-none dark:bg-gray-600 text-gray-300 p-2 rounded pointer-events-none'
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ delay: 0.01 }}>
            {command.text}
          </motion.div>
        )}
      </AnimatePresence>
      {command.icon}
    </button>
  )
}

const CreateSnip: FC<{ create: () => void; text: string }> = ({
  create,
  text,
}) => {
  return (
    <button
      className='flex justify-center text-sm bg-gray-200 dark:bg-gray-700 border border-transparent hover:bg-[#dbdbdb] active:bg-[#cecece] dark:hover:bg-gray-600 py-3 px-4 rounded font-medium transition-colors'
      onClick={create}
      aria-label={text}>
      {text}
    </button>
  )
}

export default Options
