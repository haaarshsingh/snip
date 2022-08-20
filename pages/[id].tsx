import Editor from '@components/Editor'
import { ViewOptions } from '@components/Options'
import Palette from '@components/Palette/View'
import Wrapper from '@components/Wrapper'
import supabase from '@lib/supabase'
import { definitions } from '@typings/supabase'
import type { GetServerSideProps, NextPage } from 'next'

const View: NextPage<{ snip: definitions['snips'] }> = ({ snip }) => {
  const user = supabase.auth.user()

  return (
    <Wrapper>
      <Palette snip={snip} user={user} />
      <Editor snip={snip} readOnly />
      <ViewOptions snip={snip} owner={user?.id === snip.user_id} />
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response: Promise<definitions['snips'][]> = fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888'
        : 'https://snip.place'
    }/api/snip_get?id=${params?.id?.toString()}`
  ).then((res) => res.json())

  const snip = (await response)[0]

  return {
    props: {
      snip: snip,
    },
  }
}

export default View
