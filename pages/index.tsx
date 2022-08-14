import Editor from '@components/Editor'
import Wrapper from '@components/Wrapper'
import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Editor language='javascript' />
    </Wrapper>
  )
}

export default Home
