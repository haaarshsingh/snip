import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'
import Options from '@components/Options'
import { expires as ExpiresEnum } from '@typings/expires'

const Home: NextPage = () => {
  const [language, setLanguage] = useState<keyof typeof langs>('JavaScript')
  const [expires, setExpires] = useState<ExpiresEnum>(ExpiresEnum.NEVER)

  return (
    <Wrapper>
      <Palette setLanguage={setLanguage} setExpires={setExpires} />
      <Editor language={language} expires={expires} />
      <Options />
    </Wrapper>
  )
}

export default Home
