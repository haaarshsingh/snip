import { FC, useRef } from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { theme } from '@lib/theme'
import langs from '@lib/languages'
import { useKmenu } from 'kmenu'
import { FiCode } from 'react-icons/fi'

const Form: FC<{
  language: keyof typeof langs
}> = ({ language }) => {
  const inputRef = useRef<ReactCodeMirrorRef>(null)
  const [input, setInput, open, setOpen] = useKmenu()

  return (
    <div className='w-full flex flex-col items-start justify-center mt-10'>
      <button
        onClick={() => setOpen(2)}
        className='flex items-center bg-gray-800 hover:bg-gray-700 transition py-3 px-5 rounded-lg mb-5'
      >
        <FiCode className='mr-2' />
        {language}
      </button>
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
