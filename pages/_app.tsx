import '@css/globals.css'
import 'kmenu/dist/index.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Bar from 'nextjs-progressbar'

const Snip = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <Bar
        color='#29D'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Snip
