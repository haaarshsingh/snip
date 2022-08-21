import { useShortcut } from 'kmenu'
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react'
import { FiCheck } from 'react-icons/fi'
import FocusTrap from 'focus-trap-react'

const PasswordModal: FC<{
  onClick: () => void
  setPassword: Dispatch<SetStateAction<string>>
}> = ({ onClick, setPassword }) => {
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])

  const enter = useShortcut({ targetKey: 'Enter' })
  useEffect(() => {
    if (enter) onClick()
  }, [enter])

  return (
    <div className='backdrop bg-[#00000090] backdrop-blur-sm'>
      {/* @ts-ignore */}
      <FocusTrap>
        <div
          className='dialog bg-gray-900 border shadow-2xl rounded-lg border-gray-800'
          aria-modal={true}
        >
          <input
            placeholder='Snip password...'
            className='searchbar text-black dark:text-white border-b-2 border-b-[#393939]'
            aria-expanded='true'
            aria-autocomplete='list'
            aria-controls='options'
            aria-haspopup='listbox'
            role='combobox'
            spellCheck='false'
            style={{ borderBottom: '1px solid rgb(57, 57, 57)' }}
            onChange={(event) => setPassword(event.currentTarget.value)}
            ref={input}
          />
          <a href='#' className='command mt-2' onClick={onClick}>
            <div aria-hidden='true' className='bg-[#FFFFFF10] selected' />
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
