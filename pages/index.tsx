import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'
import Options from '@components/Options'

const Home: NextPage = () => {
  const [language, setLanguage] = useState<keyof typeof langs>('JavaScript')

  return (
    <Wrapper>
      <Palette language={language} setLanguage={setLanguage} />
      <Editor language={language} />
      <Options />
    </Wrapper>
  )
}

export default Home
