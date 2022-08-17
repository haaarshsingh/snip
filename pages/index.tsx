import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'
import Options from '@components/Options'
import { expires as ExpiresEnum } from '@typings/expires'
import { nanoid } from 'nanoid'

const Home: NextPage = () => {
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [slug, setSlug] = useState<string>(nanoid(10))
  const [language, setLanguage] = useState<keyof typeof langs>('JavaScript')
  const [expires, setExpires] = useState<ExpiresEnum>(ExpiresEnum.NEVER)

  const create = () => {
    console.log(code)
    console.log(password)
    console.log(slug)
    console.log(language)
    console.log(expires)
  }

  return (
    <Wrapper>
      <Palette
        create={create}
        setPassword={setPassword}
        setSlug={setSlug}
        setLanguage={setLanguage}
        setExpires={setExpires}
      />
      <Editor setCode={setCode} language={language} expires={expires} />
      <Options create={create} />
    </Wrapper>
  )
}

export default Home
