import Editor from '@components/Editor'
import { ViewOptions } from '@components/Options'
import Palette from '@components/Palette/View'
import Wrapper from '@components/Wrapper'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const View: NextPage<{ snip: definitions['snips'] }> = ({ snip }) => {
  const user = supabase.auth.user()

  const router = useRouter()
  useEffect(() => {
    if (snip.id === undefined) router.push('/')
  }, [])

  if (snip.id !== undefined) {
    return (
      <Wrapper>
        <Palette snip={snip} user={user} />
        <Editor snip={snip} readOnly />
        <ViewOptions snip={snip} owner={user?.id === snip.user_id} />
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

export default View
