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
    backdropColor: '#00000099',
    backgroundColor: '#171717',
    backdropBlur: 0.1,
    borderWidth: 1,
    borderColor: '#333333',
    inputBorder: '#333333',
    inputColor: '#ffffff',
    barBackground: '#FFFFFF10',
    headingColor: '#696969',
    commandInactive: '#696969',
    commandActive: '#ffffff',
    breadcrumbColor: '#202020',
  }

  const lightConfig: MenuConfig = {
    backdropColor: 'rgba(256, 256, 256, 0.50)',
    backdropBlur: 0,
  }

  return (
    <div>
      <Head>
        <title>{title ? title : meta.title}</title>
        <link rel='shortcut icon' type='image/png' href='/favicon.png' />
        <meta
          content={description ? description : meta.description}
          name='description'
        />
        <meta property='og:url' content={`${meta.root}${router.asPath}`} />
        <link rel='canonical' href={`${meta.root}${router.asPath}`} />
        <meta property='og:type' content={meta.type} />
        <meta
          property='og:site_name'
          content='Harsh Singh &amp; Ibrahim Hisham'
        />
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
        dimensions={{ sectionHeight: 43, commandHeight: 50 }}>
        <Toaster />
        <div className='flex flex-col items-center'>
          <div className='max-w-800 w-90 lg:w-70 xl:w-60 2xl:w-40 mt-10'>
            <Navbar header={nav} />
            <main id='main'>{children}</main>
            <Footer />
          </div>
        </div>
      </MenuProvider>
    </div>
  )
}

export default Wrapper
