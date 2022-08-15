import { FC, ReactNode, useState } from 'react'
import { FiEdit2, FiLock } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

const Options: FC = () => {
  const options = [
    { text: 'Encrypt Snip', icon: <FiLock /> },
    { text: 'Edit Slug', icon: <FiEdit2 /> },
  ]

  return (
    <div className='mt-10 bg-gray-800 flex items-center justify-between p-5 rounded-lg text-xl'>
      <div className='flex items-center'>
        {options.map((command, index) => (
          <Option command={command} key={index} />
        ))}
      </div>
      <div>
        <button className='text-base bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded font-medium transition-colors'>
          Create Snip
        </button>
      </div>
    </div>
  )
}

const Option: FC<{ command: { icon: ReactNode; text: string } }> = ({
  command,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <button
      className='mx-2 text-gray-500 hover:text-white transition-colors flex justify-center'
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className='absolute block text-sm -mt-12 bg-gray-600 text-gray-300 p-2 rounded pointer-events-none'
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
