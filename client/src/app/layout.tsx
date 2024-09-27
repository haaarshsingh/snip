import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const display = localFont({
  src: './fonts/söhne.woff2',
  variable: '--font-display',
  weight: '400',
})

const mono = localFont({
  src: './fonts/commit-mono.woff2',
  variable: '--font-mono',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'snip',
  description: '',
}

export default ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
