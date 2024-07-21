import Link from 'next/link'

export default () => {
  return (
    <nav className='flex items-center justify-between mt-12'>
      <Link href='/'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 128 128'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <mask
            id='mask0_1236_5'
            className='[mask-type:alpha]'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='128'
            height='128'
          >
            <rect width='128' height='128' rx='64' fill='white' />
          </mask>
          <g mask='url(#mask0_1236_5)'>
            <rect
              width='128'
              height='128'
              rx='64'
              fill='url(#paint0_linear_1236_5)'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_1236_5'
              x1='64'
              y1='0'
              x2='64'
              y2='128'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#550CF5' />
              <stop offset='1' stopColor='#BB64FF' />
            </linearGradient>
          </defs>
        </svg>
      </Link>
      <Link
        href='/login'
        className='text-sm select-none bg-neutral-800/40 px-4 py-1.5 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800/60 transition-all active:scale-95'
      >
        Login
      </Link>
    </nav>
  )
}
