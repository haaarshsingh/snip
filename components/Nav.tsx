import { FC } from 'react'
import { FiCommand } from 'react-icons/fi'
import Link from 'next/link'
import { useKmenu } from 'kmenu'
import Image from 'next/image'

const Nav: FC<{ header?: string }> = ({ header }) => {
  const [input, setInput, open, setOpen] = useKmenu()

  return (
    <div className='flex items-center justify-between w-full'>
      <Link href={header ? '/snips' : '/'} passHref>
        <a className='flex items-center'>
          {!header && (
            <Image
              src='/cyclone.png'
              width={40}
              height={40}
              layout='fixed'
              alt='Cyclone logo'
              draggable={false}
            />
          )}
          <h1 className='text-black dark:text-white text-3xl font-bold cursor-pointer ml-2'>
            {header || 'snip.place'}
          </h1>
        </a>
      </Link>
      <button
        className='bg-white shadow-2xl dark:shadow-none text-black dark:bg-gray-800 transition hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white w-12 h-12 rounded-lg flex justify-center text-xl items-center'
        onClick={() => setOpen(1)}
        aria-label='Open Command Menu'
        title='Open Command Menu'
      >
        <FiCommand size={25} strokeWidth={1.5} />
      </button>
    </div>
  )
}

export default Nav
