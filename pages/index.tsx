import { useState } from 'react'
import dynamic from 'next/dynamic'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'
import Options from '@components/Options'
import { expires as ExpiresEnum } from '@typings/expires'
import supabase from '@lib/supabase'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { errorIconTheme, errorStyle } from '@css/toast'
import { nanoid } from 'nanoid'
const Editor = dynamic(() => import('@components/Editor'))

const Home: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<boolean | undefined>(undefined)
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [language, setLanguage] = useState<keyof typeof langs | undefined>(
    'JavaScript'
  )
  const [expires, setExpires] = useState<ExpiresEnum>(ExpiresEnum.NEVER)
  const user = supabase.auth.user()

  const create = () => {
    setLoading(true)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const authenticatedHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.id}`,
    })

    fetch('/api/snip_new', {
      method: 'POST',
      // @ts-ignore
      headers: user ? authenticatedHeaders : headers,
      body: JSON.stringify({
        id: slug === undefined || slug === '' ? null : slug,
        code: code,
        password: password ? nanoid(20) : undefined,
        language: language,
        expires: expires,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(`/${res[0].id}`))
      .catch((err) => {
        setLoading(false)
        console.log(err)
        return toast.error('Error Creating Snip!', {
          style: errorStyle,
          iconTheme: errorIconTheme,
        })
      })
  }

  return (
    <Wrapper>
      <Palette
        user={user}
        slug={slug}
        setSlug={setSlug}
        setLanguage={setLanguage}
        setExpires={setExpires}
      />
      {/* @ts-ignore */}
      <Editor setCode={setCode} language={language} expires={expires} />
      <Options
        create={create}
        loading={loading}
        user={user}
        password={password}
        setPassword={setPassword}
      />
    </Wrapper>
  )
}

export default Home
