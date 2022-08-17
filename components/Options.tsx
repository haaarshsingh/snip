import { FC, ReactNode, useState } from 'react'
import { FiEdit2, FiLock } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useKmenu } from 'kmenu'

const Options: FC<{ create: () => void }> = ({ create }) => {
  const options = [
    { text: 'Encrypt Snip', icon: <FiLock />, index: 4 },
    { text: 'Edit Slug', icon: <FiEdit2 />, index: 5 },
  ]

  return (
    <div className='mt-10 bg-white shadow-custom dark:bg-gray-800 flex items-center justify-between p-5 rounded-lg text-xl'>
      <div className='flex items-center'>
        {options.map((command, index) => (
          <Option command={command} key={index} />
        ))}
      </div>
      <div>
        <button
          className='text-base bg-gray-200 dark:bg-gray-700 hover:bg-[#dbdbdb] active:bg-[#cecece] dark:hover:bg-gray-600 py-3 px-4 rounded font-medium transition-colors'
          onClick={create}
        >
          Create Snip
        </button>
      </div>
    </div>
  )
}

const Option: FC<{
  command: { icon: ReactNode; text: string; index: number }
}> = ({ command }) => {
  const [input, setInput, kmenu, setKmenu] = useKmenu()
  const [open, setOpen] = useState(false)

  return (
    <button
      className='mx-2 text-gray-300 dark:text-gray-500 dark:hover:text-white hover:text-black transition-colors flex justify-center'
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setKmenu(command.index)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className='absolute block text-sm -mt-12 bg-gray-200 border border-gray-300 dark:border-none dark:bg-gray-600 text-gray-300 p-2 rounded pointer-events-none'
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {command.text}
          </motion.div>
        )}
      </AnimatePresence>
      {command.icon}
    </button>
  )
}

export default Options
