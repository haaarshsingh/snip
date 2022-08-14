import '@css/globals.css'
import 'kmenu/dist/index.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

const Snip = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Snip
