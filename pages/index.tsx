import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'
import Options from '@components/Options'
import { expires as ExpiresEnum } from '@typings/expires'
import { nanoid } from 'nanoid'
import supabase from '@lib/supabase'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [language, setLanguage] = useState<keyof typeof langs | undefined>(
    'JavaScript'
  )
  const [expires, setExpires] = useState<ExpiresEnum>(ExpiresEnum.NEVER)
  const user = supabase.auth.user()

  const create = () => {
    fetch('/api/snip_new', {
      method: 'POST',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
        Authorization: user ? `Bearer ${user.id}` : undefined,
      },
      body: JSON.stringify({
        id: slug,
        code: code,
        password: password,
        language: language,
        expires: expires,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(`/${res[0].id}`))
      .catch((err) => console.log(err))
  }

  return (
    <Wrapper>
      <Palette
        user={user}
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
