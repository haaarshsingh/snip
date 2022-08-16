import { FC, useRef } from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { dark, light } from '@lib/theme'
import langs from '@lib/languages'
import { useKmenu } from 'kmenu'
import { FiClock, FiCode } from 'react-icons/fi'
import { expires as ExpiresEnum } from '@typings/expires'
import { Snip } from '@typings/snip'
import { useTheme } from 'next-themes'

const Form: FC<{
  language?: keyof typeof langs
  expires?: ExpiresEnum
  readOnly?: boolean
  snip?: Snip
}> = ({ language, expires, readOnly, snip }) => {
  const inputRef = useRef<ReactCodeMirrorRef>(null)
  const [input, setInput, open, setOpen] = useKmenu()
  const { theme } = useTheme()

  return (
    <div className='w-full flex flex-col items-start justify-center mt-10'>
      <div className='flex items-center justify-between w-full'>
        <button
          onClick={readOnly ? undefined : () => setOpen(2)}
          className={`flex items-center bg-white shadow-2xl dark:shadow-none dark:bg-gray-800 py-3 px-5 rounded-lg mb-5 cursor-default ${
            !readOnly && 'interactive'
          }`}
        >
          <FiCode className='mr-2' />
          {language || snip?.language}
        </button>
        {!readOnly && (
          <button
            onClick={readOnly ? undefined : () => setOpen(3)}
            className={`flex items-center bg-white shadow-2xl dark:shadow-none dark:bg-gray-800 py-3 px-5 rounded-lg mb-5 cursor-default ${
              !readOnly && 'interactive'
            }`}
          >
            {readOnly ? `Expires in ${snip?.expiresIn.toLowerCase()}` : expires}
            <FiClock className='ml-2' />
          </button>
        )}
      </div>
      <CodeMirror
        className={`w-full bg-white dark:bg-gray-800 ${readOnly && 'readonly'}`}
        height='700px'
        spellCheck='false'
        theme={theme === 'dark' ? dark : light}
        extensions={[langs[language! || snip?.language]()]}
        basicSetup={{
          autocompletion: false,
          searchKeymap: false,
          historyKeymap: false,
        }}
        readOnly={readOnly}
        value={snip?.code || ''}
        autoFocus
        ref={inputRef}
      />
    </div>
  )
}

export default Form
