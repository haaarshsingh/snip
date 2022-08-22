import Palette from '@components/Palette/User'
import User from '@components/User'
import Wrapper from '@components/Wrapper'
import supabase from '@lib/supabase'
import { useUser } from '@lib/UserContext'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Snips: NextPage<{
  snips: definitions['snips'][]
  id: string
}> = ({ snips, id }) => {
  const { user } = useUser()

  const router = useRouter()
  useEffect(() => {
    if (user?.data.user?.id !== id) router.push('/')
  }, [])

  if (user?.data.user?.id === id) {
    return (
      <Wrapper nav='Your Snips'>
        <Palette />
        <User snips={snips} />
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
    }/api/user_snips`,
    {
      headers: { Authorization: `Bearer ${params?.id?.toString()}` },
    }
  ).then((res) => res.json())

  return {
    props: {
      snips: await response,
      id: params?.id?.toString(),
    },
  }
}

export default Snips
