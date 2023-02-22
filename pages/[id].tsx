import Editor from '@components/Editor'
import { ViewOptions } from '@components/Options'
import Palette from '@components/Palette/View'
import PasswordModal from '@components/PasswordModal'
import Wrapper from '@components/Wrapper'
import {
  promiseIconTheme,
  promiseIconThemeDark,
  promiseStyle,
  promiseStyleDark,
} from '@css/toast'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const View: NextPage<{
  snip: definitions['snips']
  encrypted: boolean
  id: string
}> = ({ snip, encrypted, id }) => {
  const user = supabase.auth.user()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [unlockedSnip, setUnlockedSnip] = useState<
    definitions['snips'] | undefined
  >(undefined)
  const { theme } = useTheme()

  useEffect(() => {
    if (snip.id === undefined && !encrypted) router.push('/')
  }, [encrypted, router, snip.id])

  const refetch = () => {
    const response = fetch(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8888'
          : 'https://snip.place'
      }/api/snip_get?id=${id}`,
      {
        headers: { Password: password },
      }
    )
      .then((res) => {
        if (res.status === 401) throw new Error('Incorrect Password')
        return res.json()
      })
      .then((res) => setUnlockedSnip(res[0]))

    toast.promise(
      response,
      {
        loading: 'Loading',
        success: 'Loaded Snip!',
        error: 'Incorrect Password',
      },
      {
        style: theme === 'dark' ? promiseStyleDark : promiseStyle,
        iconTheme: theme === 'dark' ? promiseIconThemeDark : promiseIconTheme,
      }
    )
  }

  if (snip.id !== undefined && !encrypted) {
    return (
      <Wrapper>
        <Palette snip={snip} user={user} />
        <Editor snip={snip} readOnly />
        <ViewOptions snip={snip} owner={user?.id === snip.user_id} />
      </Wrapper>
    )
  }

  if (encrypted && typeof unlockedSnip === 'undefined') {
    const snip = {
      id: 'locked',
      language: null,
      code: 'The contents of this paste are encrypted',
      created_at: '',
      expires_in: null,
    }

    return (
      <Wrapper>
        <PasswordModal onClick={refetch} setPassword={setPassword} />
        <Editor snip={snip} readOnly />
      </Wrapper>
    )
  }

  if (unlockedSnip?.id !== undefined) {
    return (
      <Wrapper>
        <Palette snip={unlockedSnip} user={user} />
        <Editor snip={unlockedSnip} readOnly />
        <ViewOptions
          snip={unlockedSnip}
          owner={user?.id === unlockedSnip.user_id}
        />
      </Wrapper>
    )
  }

  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888'
        : 'https://snip.place'
    }/api/snip_get?id=${params?.id?.toString()}`
  ).then((res) => res.json())
  const snip = await response

  if (snip.statusCode === 401) {
    const raw = JSON.stringify({
      message: {
        to: { email: 'hi.harsh@pm.me' },
        content: {
          title: `Your OTP For snip.place/${params?.id?.toString()}`,
          body: 'Your code is: -S97WKwC7c2QV35iktge',
        },
      },
    })

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${process.env.COURIER_API_KEY}`)
    headers.append('Content-Type', 'application/json')

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow',
    }

    fetch('https://api.courier.com/send', requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error)
  }

  return {
    props: {
      snip: snip[0] || [],
      encrypted: snip.statusCode === 401,
      id: params?.id?.toString(),
    },
  }
}

export default View
