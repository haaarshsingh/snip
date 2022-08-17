import Editor from '@components/Editor'
import Palette from '@components/Palette/View'
import Wrapper from '@components/Wrapper'
import { expires } from '@typings/expires'
import { definitions } from '@typings/supabase'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const Home: NextPage<{ snip: definitions['snips'] }> = ({ snip }) => {
  return (
    <Wrapper>
      <Palette snip={snip} />
      <Editor snip={snip} readOnly />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      snip: {
        slug: '',
        language: 'JavaScript',
        code: 'teri mkc',
        expiresIn: expires.NEVER,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: false,
  }
}

export default Home
