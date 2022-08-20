import Palette from '@components/Palette/User'
import User from '@components/User'
import Wrapper from '@components/Wrapper'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Snips: NextPage<{ snips: definitions['snips'][] }> = ({ snips }) => {
  const user = supabase.auth.user()
  const router = useRouter()
  useEffect(() => {
    if (!user) router.push('/')
  }, [])

  return (
    <Wrapper nav='Your Snips'>
      <Palette />
      <User snips={snips} />
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response: Promise<definitions['snips'][]> = fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888'
        : 'https://snip.place'
    }/api/user_snips`,
    {
      headers: { Authorization: 'Bearer c3a74692-f210-4f27-bb36-feedb31f8425' },
    }
  ).then((res) => res.json())

  return {
    props: {
      snips: await response,
    },
  }
}

export default Snips
