import { definitions } from '@typings/supabase'
import { FC, useEffect, useRef, useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import { useShortcut } from 'kmenu'
import { FiSearch } from 'react-icons/fi'

const User: FC<{ snips: definitions['snips'][] }> = ({ snips }) => {
  const [selected, setSelected] = useState(0)
  const [results, setResults] = useState<definitions['snips'][] | undefined>(
    snips
  )
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef.current?.focus(), [])

  const up = useShortcut({ targetKey: 'ArrowUp' })
  const down = useShortcut({ targetKey: 'ArrowDown' })

  useEffect(() => {
    if (up && selected > 0) setSelected((selected) => selected - 1)
    else if (down && selected < results!.length - 1)
      setSelected((selected) => selected + 1)
  }, [up, down])

  return (
    <div className='flex flex-col min-h-[80vh]'>
      <div className='flex items-center h-16 bg-[#1f1f1f] rounded text-lg my-10'>
        <FiSearch className='text-xl ml-5' />
        <input
          className='bg-transparent ml-3 outline-none w-full'
          autoFocus
          placeholder='Search snips...'
          ref={inputRef}
          spellCheck='false'
          autoComplete='false'
          autoCapitalize='false'
          onChange={(event) => {
            setSelected(0)
            return setResults(
              snips.filter((snip) =>
                snip.id.includes(event.currentTarget.value.toLowerCase())
              )
            )
          }}
        />
      </div>
      <AnimateSharedLayout>
        {results?.map((snip, index) => (
          <Snip
            key={index}
            snip={snip}
            selected={selected === index}
            onMouseMove={() => setSelected(index)}
          />
        ))}
      </AnimateSharedLayout>
    </div>
  )
}

const Snip: FC<{
  snip: definitions['snips']
  selected: boolean
  onMouseMove: () => void
}> = ({ snip, selected, onMouseMove }) => {
  const enter = useShortcut({ targetKey: 'Enter' })

  useEffect(() => {
    if (enter) window.open(`https://snip.place/${snip.id}`, '_self')
  }, [enter])

  return (
    <Link href={`/${snip.id}`} passHref>
      <a
        className='w-full select-none text-base h-16 flex items-center rounded-lg transition-colors relative'
        onMouseMove={onMouseMove}
        style={{
          color: selected ? '#FFFFFF' : '#444444',
        }}
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
        <p className='mx-5'>/{snip.id}</p>
      </a>
    </Link>
  )
}

export default User
