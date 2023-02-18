import Image from 'next/image'
import { FC } from 'react'
import { motion } from 'framer-motion'

const Footer: FC = () => {
  return (
    <footer className='w-full flex justify-center my-24'>
      <div>
        <p className='text-xs text-gray-300 dark:text-gray-400 flex items-center'>
          Crafted by
          <motion.a
            href='https://hxrsh.in'
            target='_blank'
            rel='noreferrer'
            className='text-black dark:text-white flex items-center mx-[0px] bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 p-[6px] rounded-full transition-colors'
            whileTap={{ scale: 0.9 }}>
            <Image
              src='https://avatars.githubusercontent.com/u/69592270?v=4'
              alt="Harsh's PFP"
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
            whileTap={{ scale: 0.9 }}>
            <Image
              src='https://avatars.githubusercontent.com/u/61324615?v=4'
              alt="Ibrahim's PFP"
              className='rounded-full'
              height={20}
              width={20}
            />
            <span className='ml-1 font-medium'>Ibra</span>
          </motion.a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
