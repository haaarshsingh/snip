import { useShortcut } from 'kmenu'
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import { FiCheck } from 'react-icons/fi'
import FocusTrap from 'focus-trap-react'
import { useTheme } from 'next-themes'

const PasswordModal: FC<{
  onClick: () => void
  setPassword: Dispatch<SetStateAction<string>>
}> = ({ onClick, setPassword }) => {
  const { theme } = useTheme()
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])

  const enter = useShortcut({ targetKey: 'Enter' })
  useEffect(() => {
    if (enter) onClick()
  }, [enter, onClick])

  return (
    <div className='backdrop bg-[#FFFFFF50] dark:bg-[#00000090] backdrop-blur-sm'>
      {/* @ts-ignore */}
      <FocusTrap>
        <div
          className='dialog bg-white dark:bg-gray-900 border shadow-2xl rounded border-transparent dark:border-gray-800'
          aria-modal={true}>
          <input
            placeholder='Snip password...'
            className='searchbar text-black dark:text-white border-b-2 mt-2'
            aria-expanded='true'
            aria-autocomplete='list'
            aria-controls='options'
            aria-haspopup='listbox'
            role='combobox'
            spellCheck='false'
            style={{
              borderBottom: `1px solid ${
                theme === 'dark' ? 'rgb(31,41, 55)' : 'rgb(31,41, 55)'
              }`,
            }}
            onChange={(event) => setPassword(event.currentTarget.value)}
            ref={input}
          />
          <a href='#' className='command mt-2 mx-2' onClick={onClick}>
            <div
              aria-hidden='true'
              className='bg-[#00000010] dark:bg-[#FFFFFF10] selected'
            />
            <div className='info_wrapper'>
              <FiCheck />
              <p className='command_text'>Confirm</p>
            </div>
          </a>
        </div>
      </FocusTrap>
    </div>
  )
}

export default PasswordModal
