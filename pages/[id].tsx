import Editor from '@components/Editor'
import { ViewOptions } from '@components/Options'
import Palette from '@components/Palette/View'
import PasswordModal from '@components/PasswordModal'
import Wrapper from '@components/Wrapper'
import { errorIconTheme, errorStyle } from '@css/toast'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'
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

  useEffect(() => {
    if (snip.id === undefined && !encrypted) router.push('/')
  }, [])

  const refetch = async () => {
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
      .then((res) => res.json())
      .catch((err) => {
        console.log('test')
        console.log(err)
      })

    const snip = await response

    toast.promise(response, {
      loading: 'Loading',
      success: 'Got the data',
      error: 'Error when fetching',
    })

    if (snip[0]) {
      setUnlockedSnip(snip[0])
    }
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

  return {
    props: {
      snip: snip[0] || [],
      encrypted: snip.statusCode === 401,
      id: params?.id?.toString(),
    },
  }
}

export default View
