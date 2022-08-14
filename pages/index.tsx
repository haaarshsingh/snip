import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'

const Home: NextPage = () => {
  const [language, setLanguage] = useState<keyof typeof langs>('javascript')

  return (
    <Wrapper>
      <Palette language={language} setLanguage={setLanguage} />
      <Editor language={language} />
    </Wrapper>
  )
}

export default Home
