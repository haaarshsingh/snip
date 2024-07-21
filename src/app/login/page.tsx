import Link from 'next/link'
import { AiFillGithub, AiFillGitlab } from 'react-icons/ai'
import { TbChevronLeft, TbInfoCircle } from 'react-icons/tb'

export default () => (
  <div className='h-screen flex items-center justify-center'>
    <main className='w-[320px] sm:w-[350px]'>
      <Link href='/' className='text-sm flex items-center mb-8 group'>
        <TbChevronLeft className='mr-1 group-hover:-translate-x-0.5 transition-transform' />
        Go Back
      </Link>
      <form className='flex flex-col items-center w-full'>
        <div className='flex flex-col w-full'>
          <label className='text-sm mb-1'>Email</label>
          <input
            type='email'
            placeholder='example@email.com'
            className='bg-neutral-800/25 border border-neutral-800 px-3 text-sm rounded-md py-2 outline-none'
          />
        </div>
        <button className='text-sm select-none bg-neutral-800/40 py-2 border border-neutral-800 rounded hover:bg-neutral-800/60 transition-all active:scale-[.98] w-full mt-2'>
          Send Login Link
        </button>
      </form>
      <div className='flex flex-col relative my-4'>
        <hr className='h-0 border-t border-t-neutral-800 mt-2.5' />
        <div className='text-sm text-center absolute left-1/2 -translate-x-1/2'>
          <span className='px-2 bg-neutral-900 text-secondary'>OR</span>
        </div>
      </div>
      <div className='flex items-center gap-x-2'>
        <button className='text-lg select-none bg-neutral-800/40 h-[38px] border border-neutral-800 rounded hover:bg-neutral-800/60 transition-all active:scale-[.97] w-1/2 mt-2 flex justify-center items-center'>
          <AiFillGithub />
        </button>
        <button className='text-lg select-none bg-neutral-800/40 h-[38px] border border-neutral-800 rounded hover:bg-neutral-800/60 transition-all active:scale-[.97] w-1/2 mt-2 flex justify-center items-center'>
          <AiFillGitlab />
        </button>
      </div>
      <div className='flex items-center text-xs text-neutral-500 mt-8 mb-12'>
        <div className='flex-none mr-2'>
          <TbInfoCircle />
        </div>
        <span>
          Create account to view all of your snips, create private snips, edit
          snips, and much more. Information stored in database: generated user
          id, service (email, GitHub, GitLab), public/private profile, default
          language, and API key.
        </span>
      </div>
    </main>
  </div>
)
