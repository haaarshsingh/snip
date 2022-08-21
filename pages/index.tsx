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
  const user = supabase.auth.user()

  const create = () => {
    setLoading(true)

    if (
      slug &&
      (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/g.test(slug.toLowerCase()) ||
        slug.includes('/') ||
        slug === 'snips')
    ) {
      setLoading(false)
      return toast.error('Invalid Slug!', {
        style: errorStyle,
        iconTheme: errorIconTheme,
      })
    }

    if (code === '') {
      setLoading(false)
      return toast.error('Empty Code!', {
        style: errorStyle,
        iconTheme: errorIconTheme,
      })
    }

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
        create={create}
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
