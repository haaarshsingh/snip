import { FC, useRef } from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { theme } from '@lib/theme'
import langs from '@lib/languages'
import { useKmenu } from 'kmenu'
import { FiClock, FiCode } from 'react-icons/fi'
import { expires as ExpiresEnum } from '@typings/expires'

const Form: FC<{
  language: keyof typeof langs
  expires: ExpiresEnum
}> = ({ language, expires }) => {
  const inputRef = useRef<ReactCodeMirrorRef>(null)
  const [input, setInput, open, setOpen] = useKmenu()

  return (
    <div className='w-full flex flex-col items-start justify-center mt-10'>
      <div className='flex items-center justify-between w-full'>
        <button
          onClick={() => setOpen(2)}
          className='flex items-center bg-gray-800 hover:bg-gray-700 transition py-3 px-5 rounded-lg mb-5'
        >
          <FiCode className='mr-2' />
          {language}
        </button>
        <button
          onClick={() => setOpen(3)}
          className='flex items-center bg-gray-800 hover:bg-gray-700 transition py-3 px-5 rounded-lg mb-5'
        >
          {expires}
          <FiClock className='ml-2' />
        </button>
      </div>
      <CodeMirror
        className='w-full bg-gray-800'
        height='700px'
        spellCheck='false'
        theme={theme}
        extensions={[langs[language]()]}
        basicSetup={{
          autocompletion: false,
          searchKeymap: false,
          historyKeymap: false,
        }}
        autoFocus
        ref={inputRef}
      />
    </div>
  )
}

export default Form
