import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class PortfolioDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body className='bg-[#F6F6F6] dark:bg-gray-900'>
          {/* <link
            rel='preload'
            href='/IosevkaRegular.ttf'
            as='font'
            crossOrigin=''
          /> */}
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
            as='font'
            crossOrigin=''
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
