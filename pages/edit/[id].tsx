import Editor from '@components/Editor'
import Options from '@components/Options'
import Palette from '@components/Palette/Edit'
import Wrapper from '@components/Wrapper'
import { errorIconTheme, errorStyle } from '@css/toast'
import langs from '@lib/languages'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Edit: NextPage<{ snip: definitions['snips'] }> = ({ snip }) => {
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState<string>(snip.code)
  const [password, setPassword] = useState<string | null>(snip.password!)
  const [language, setLanguage] = useState<keyof typeof langs | undefined>(
    snip.language === null ? undefined : (snip.language as keyof typeof langs)
  )
  const user = supabase.auth.user()

  const router = useRouter()
  useEffect(() => {
    if (snip.user_id !== user?.id) router.push('/')
  }, [router, snip.user_id, user?.id])

  const edit = () => {
    setLoading(true)

    fetch('/api/snip_edit', {
      method: 'PATCH',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.id}`,
      },
      body: JSON.stringify({
        id: snip.id,
        code: code,
        password: password,
        language: language,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(`/${res[0].id}`))
      .catch((err) => {
        setLoading(false)
        console.log(err)
        return toast.error('Error Editing Snip!', {
          style: errorStyle,
          iconTheme: errorIconTheme,
        })
      })
  }

  if (snip.user_id === user?.id) {
    return (
      <Wrapper>
        <Palette
          user={user}
          create={edit}
          setPassword={setPassword}
          setLanguage={setLanguage}
        />
        <Editor snip={snip} setCode={setCode} language={language} hideExpires />
        <Options create={edit} loading={loading} edit />
      </Wrapper>
    )
  }

  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response: Promise<definitions['snips'][]> = fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888'
        : 'https://snip.place'
    }/api/snip_get?id=${params?.id?.toString()}`
  ).then((res) => res.json())

  return {
    props: {
      snip: (await response)[0] || [],
    },
  }
}

export default Edit
