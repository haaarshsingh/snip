import { definitions } from '@typings/supabase'
import { FC, useEffect, useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import { useShortcut } from 'kmenu'
import { FiSearch } from 'react-icons/fi'

const User: FC<{ snips: definitions['snips'][] }> = ({ snips }) => {
  const [selected, setSelected] = useState(0)

  const up = useShortcut({ targetKey: 'ArrowUp' })
  const down = useShortcut({ targetKey: 'ArrowDown' })

  useEffect(() => {
    if (up && selected > 0) setSelected((selected) => selected - 1)
    else if (down && selected < snips.length - 1)
      setSelected((selected) => selected + 1)
  }, [up, down, snips])

  return (
    <div className='flex flex-col mt-5 min-h-[80vh]'>
      <div className='flex items-center p-5 bg-gray-800 rounded text-lg mb-10'>
        <FiSearch />
        <input className='bg-transparent' />
      </div>
      <AnimateSharedLayout>
        {snips.map((snip, index) => (
          <Snip
            key={index}
            snip={snip}
            selected={selected === index}
            onMouseOver={() => setSelected(index)}
          />
        ))}
      </AnimateSharedLayout>
    </div>
  )
}

const Snip: FC<{
  snip: definitions['snips']
  selected: boolean
  onMouseOver: () => void
}> = ({ snip, selected, onMouseOver }) => {
  return (
    <Link href={`/${snip.id}`} passHref>
      <a
        className='w-full select-none text-xl h-16 flex items-center rounded-lg transition-colors relative'
        onMouseOver={onMouseOver}
      >
        {selected && (
          <motion.div
            layoutId='box'
            className='bg-[#00000010] dark:bg-[#FFFFFF20] rounded w-full h-16 absolute'
            transition={{
              type: 'spring',
              stiffness: 1000,
              damping: 70,
            }}
          />
        )}
        <h3 className='mx-5'>{snip.id}</h3>
      </a>
    </Link>
  )
}

export default User
