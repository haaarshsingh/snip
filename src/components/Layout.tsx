import { FC, ReactNode } from 'react'

export default (({ children }) => (
  <div className='w-full flex justify-center'>
    <div className='w-content'>{children}</div>
  </div>
)) as FC<{ children: ReactNode }>
