import { FC } from 'react'
import { TbCommand } from 'react-icons/tb'
import Link from 'next/link'
import { useKmenu } from 'kmenu'

const Nav: FC<{ header?: string }> = ({ header }) => {
  const { setOpen } = useKmenu()

  return (
    <div className='flex items-center justify-between w-full'>
      <Link href={header ? '/snips' : '/'} passHref>
        <a className='flex justify-center items-center h-8 w-8 relative'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 88 75'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='rotate-180 w-1/2 h-1/2'>
            <path
              d='M44 0L87.3013 75H0.69873L44 0Z'
              className='fill-black dark:fill-white'
            />
          </svg>
          <div className='z-10 backdrop-blur-sm w-full h-1/2 absolute top-1/2' />
        </a>
      </Link>
      <button
        className='bg-white shadow-2xl dark:shadow-none text-black dark:bg-gray-800 transition hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white w-10 h-10 rounded flex justify-center text-xl items-center'
        onClick={() => setOpen(1)}
        aria-label='Open Command Menu'
        title='Open Command Menu'>
        <TbCommand />
      </button>
    </div>
  )
}

export default Nav
