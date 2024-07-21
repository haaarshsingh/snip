import Link from 'next/link'
import { FC } from 'react'

const links = [
  {
    label: 'API',
    href: '/api',
    external: true,
  },
  {
    label: 'CLI',
    href: '/',
    external: true,
  },
  {
    label: 'GitHub',
    href: '/',
    external: true,
  },
]

export default () => (
  <footer className='flex items-center justify-between mb-8'>
    <div className='flex items-center'>
      <span className='text-sm text-neutral-500'>© 2024</span>
      <div className='w-0.5 h-0.5 rounded-full bg-neutral-600 mx-1' />
      <Link
        href='/active'
        className='text-sm decoration-neutral-500 hover:decoration-neutral-600 underline'
      >
        2,128 active snips
      </Link>
    </div>
    <nav className='flex items-center gap-x-2'>
      <NavLink label='Legal' href='/legal' external={false} />
      <div className='w-0.5 h-0.5 rounded-full bg-neutral-600 mx-1' />
      {links.map((link, index) => (
        <NavLink {...link} key={index} />
      ))}
    </nav>
  </footer>
)

const NavLink: FC<(typeof links)[0]> = ({ label, href, external }) => {
  const className =
    'underline text-sm flex items-center decoration-neutral-500 hover:decoration-neutral-600 transition-colors'

  if (external)
    return (
      <a href={href} target='_blank' rel='noreferrer' className={className}>
        {label}
        <svg
          width='8'
          height='8'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='ml-1.5 mt-0.5'
        >
          <path
            d='M11.9998 8.98049L11.9826 0.690374C11.9857 0.599686 11.9707 0.509294 11.9386 0.424411C11.9066 0.339529 11.858 0.261836 11.7958 0.195813C11.6715 0.0655294 11.5043 0.000387674 11.2926 0.000387674H2.99908C2.91204 -0.00263447 2.82529 0.0120383 2.74409 0.043518C2.66288 0.0749977 2.58891 0.122629 2.52664 0.18353C2.46438 0.24443 2.41513 0.317332 2.38186 0.397822C2.34859 0.478312 2.332 0.564716 2.3331 0.651803C2.3331 0.822372 2.39824 0.969797 2.52766 1.09494C2.65623 1.21922 2.80709 1.28179 2.97766 1.28179H6.17731L10.0515 1.17122L8.5704 2.4912L0.198854 10.8765C0.136206 10.9322 0.0860898 11.0006 0.0518127 11.0771C0.0175357 11.1537 -0.000123381 11.2366 6.48846e-07 11.3204C6.48846e-07 11.4962 0.0668566 11.6522 0.201425 11.7876C0.260726 11.8516 0.332591 11.9026 0.412525 11.9376C0.492459 11.9725 0.578745 11.9906 0.665987 11.9907C0.750333 11.9908 0.833827 11.9739 0.911452 11.9409C0.989076 11.9079 1.05923 11.8595 1.11769 11.7987L9.4961 3.41603L10.8195 1.93578L10.6969 5.52542V9.00964C10.6969 9.1802 10.7612 9.33192 10.8898 9.46477C11.0184 9.59763 11.1701 9.66362 11.3449 9.66362C11.5181 9.66362 11.6706 9.59848 11.8026 9.4682C11.8672 9.40483 11.9181 9.32881 11.952 9.24489C11.9859 9.16098 12.0022 9.07097 11.9998 8.98049Z'
            className='fill-neutral-600'
          />
        </svg>
      </a>
    )

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}
