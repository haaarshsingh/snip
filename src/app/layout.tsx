import { FC, ReactNode } from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Layout from '@/components/Layout'
import clsx from 'clsx'

const display = localFont({
  src: [{ path: './fonts/sohne.woff2', weight: '400' }],
})

const mono = localFont({
  src: [{ path: './fonts/commit-mono.woff2', weight: '400' }],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'snip',
}

export default (({ children }) => (
  <html lang='en'>
    <body className={clsx(display.className, mono.variable)}>
      <Layout>{children}</Layout>
    </body>
  </html>
)) as FC<{ children: ReactNode }>
