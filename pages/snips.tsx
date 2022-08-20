import Palette from '@components/Palette/User'
import User from '@components/User'
import Wrapper from '@components/Wrapper'
import { expires } from '@typings/expires'
import { definitions } from '@typings/supabase'
import { snips } from 'data/snips'
import type { GetStaticProps, NextPage } from 'next'

const Snips: NextPage /* <{ snips: definitions['snips'][] }> */ = () => {
  return (
    <Wrapper nav='Your Snips'>
      <Palette />
      <User snips={snips} />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      snip: [
        {
          slug: '',
          language: 'JavaScript',
          code: 'teri mkc',
          expiresIn: expires.NEVER,
        },
      ],
    },
  }
}

export default Snips
