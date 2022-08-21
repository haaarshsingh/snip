import Image from 'next/image'
import { FC } from 'react'
import { SiRust, SiSupabase } from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
import { motion } from 'framer-motion'

const Footer: FC = () => {
  return (
    <footer className='w-full flex flex-col items-center justify-center my-24'>
      <div>
        <p className='text-sm text-gray-300 dark:text-gray-600 flex items-center'>
          Built by
          <motion.a
            href='https://hxrsh.in'
            target='_blank'
            rel='noreferrer'
            className='text-black dark:text-white flex items-center mx-[0px] bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 p-[6px] rounded-full transition-colors'
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src='https://avatars.githubusercontent.com/u/69592270?v=4'
              alt='Picture of Harsh'
              className='rounded-full'
              height={20}
              width={20}
            />
            <span className='ml-1 font-medium'>Harsh</span>
          </motion.a>
          and
          <motion.a
            href='https://github.com/ibra'
            target='_blank'
            rel='noreferrer'
            className='text-black dark:text-white flex items-center mx-[0px] bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 p-[6px] rounded-full transition-colors'
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src='https://avatars.githubusercontent.com/u/61324615?v=4'
              alt='Picture of Ibra'
              className='rounded-full'
              height={20}
              width={20}
            />
            <span className='ml-1 font-medium'>Ibra</span>
          </motion.a>
        </p>
      </div>
      <div className='flex items-center text-gray-300 dark:text-gray-600 text-sm mt-3'>
        <span className='ml-1 flex items-center text-emerald-400'>
          <a
            href='https://supabase.com'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-8 decoration-emerald-300 dark:decoration-emerald-900 hover:decoration-emerald-400 hover:dark:decoration-emerald-400 transition-colors'
          >
            Supabase
          </a>
          <SiSupabase className='ml-1' />
        </span>
        &nbsp;• 
        <span className='mx-1 flex items-center text-orange-400'>
          <a
            href='https://www.rust-lang.org/'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-8 decoration-orange-300 dark:decoration-orange-900 hover:decoration-orange-400 hover:dark:decoration-orange-400 transition-colors'
          >
            Rust
          </a>
          <SiRust className='ml-1' />
        </span>
        &nbsp;•
        <span className='ml-1 flex items-center text-black dark:text-gray-100'>
          <a
            href='https://nextjs.orgf'
            target='_blank'
            rel='noreferrer'
            className='underline underline-offset-8 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black hover:dark:decoration-gray-100 transition-colors'
          >
            Next.js
          </a>
          <TbBrandNextjs className='ml-1 text-lg' />
        </span>
      </div>
    </footer>
  )
}

export default Footer
