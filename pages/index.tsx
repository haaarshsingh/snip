import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'
import Palette from '@components/Palette/Main'
import langs from '@lib/languages'
import Options from '@components/Options'
import { expires as ExpiresEnum } from '@typings/expires'
import supabase from '@lib/supabase'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { errorIconTheme, errorStyle } from '@css/toast'

const Home: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [language, setLanguage] = useState<keyof typeof langs | undefined>(
    'JavaScript'
  )
  const [expires, setExpires] = useState<ExpiresEnum>(ExpiresEnum.NEVER)
  const session = supabase.auth.session()

  const create = () => {
    setLoading(true)

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const authenticatedHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.id}`,
    })

    fetch('/api/snip_new', {
      method: 'POST',
      // @ts-ignore
      headers: user ? authenticatedHeaders : headers,
      body: JSON.stringify({
        id: slug === undefined || slug === '' ? null : slug,
        code: code,
        password: password,
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
      <p className='text-white'>{typeof session?.access_token}</p>
      <Palette
        user={session?.user!}
        slug={slug}
        password={password}
        setPassword={setPassword}
        setSlug={setSlug}
        setLanguage={setLanguage}
        setExpires={setExpires}
      />
      <Editor setCode={setCode} language={language} expires={expires} />
      <Options create={create} loading={loading} />
    </Wrapper>
  )
}

export default Home
