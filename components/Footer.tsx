import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className='w-full flex justify-center my-24'>
      <p className='text-sm text-gray-600'>
        Built by{' '}
        <a
          href='https://hxrsh.in'
          target='_blank'
          rel='noreferrer'
          className='text-gray-300 dark:text-white underline underline-offset-4 decoration-gray-600 hover:decoration-gray-500'
        >
          Harsh Singh
        </a>{' '}
        ✌️
      </p>
    </footer>
  )
}

export default Footer
