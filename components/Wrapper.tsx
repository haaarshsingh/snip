import { FC, ReactNode, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from './Nav'
import Footer from './Footer'
import { MenuConfig, MenuProvider } from 'kmenu'
import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export const meta = {
  root: 'https://snip.place',
  title: 'snip',
  description: 'A free and open-source tool for sharing online code snippets.',
  image: 'https://snip.place/banner.png',
  type: 'website',
}

const Wrapper: FC<{
  children: ReactNode
  title?: string
  description?: string
  image?: string
  nav?: string
}> = ({ children, title, description, image, nav }) => {
  const router = useRouter()
  const { theme } = useTheme()

  const darkConfig: MenuConfig = {
    backdropColor: 'rgba(0, 0, 0, 0.90)',
    backdropBlur: 5,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#393939',
    inputColor: '#FFFFFF',
    commandActive: '#FFF',
    commandInactive: '#4E4E4E',
    barBackground: '#FFFFFF10',
    inputBorder: '#393939',
  }

  const lightConfig: MenuConfig = {
    backdropColor: 'rgba(256, 256, 256, 0.50)',
    backdropBlur: 5,
  }

  return (
    <div>
      <Head>
        <title>{title ? title : meta.title}</title>
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌀</text></svg>'
        />
        <meta name='robots' content='follow, index' />
        <meta
          content={description ? description : meta.description}
          name='description'
        />
        <meta property='og:url' content={`${meta.root}${router.asPath}`} />
        <link rel='canonical' href={`${meta.root}${router.asPath}`} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='Harsh Singh' />
        <meta
          property='og:description'
          content={description ? description : meta.description}
        />
        <meta property='og:title' content={title ? title : meta.title} />
        <meta property='og:image' content={image ? image : meta.image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@harshhhdev' />
        <meta name='theme-color' content='#FFF' />
        <meta name='twitter:title' content={title ? title : meta.title} />
        <meta
          name='twitter:description'
          content={description ? description : meta.description}
        />
        <meta name='twitter:image' content={image ? image : meta.image} />
      </Head>
      <MenuProvider
        config={theme === 'dark' ? darkConfig : lightConfig}
        dimensions={{ sectionHeight: 36 }}
      >
        <Toaster />
        <div className='flex flex-col items-center'>
          <div className='max-w-800 w-90 lg:w-70 xl:w-60 2xl:w-40 mt-10'>
            <Navbar header={nav} />
            <main id='main'>{children}</main>
            <Footer />
            {/* <BackToTop /> */}
          </div>
        </div>
      </MenuProvider>
    </div>
  )
}

export default Wrapper
