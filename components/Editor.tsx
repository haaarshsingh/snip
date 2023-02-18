import { Dispatch, FC, SetStateAction, useRef } from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { dark, light } from '@lib/theme'
import langs from '@lib/languages'
import { useKmenu } from 'kmenu'
import { FiClock, FiCode } from 'react-icons/fi'
import { expires as ExpiresEnum } from '@typings/expires'
import { useTheme } from 'next-themes'
import { definitions } from '@typings/supabase'

const Editor: FC<{
  setCode?: Dispatch<SetStateAction<string>>
  language?: keyof typeof langs | undefined
  expires?: ExpiresEnum
  readOnly?: boolean
  hideExpires?: boolean
  snip?: definitions['snips']
  preventFocus?: boolean
}> = ({
  setCode,
  language,
  expires,
  readOnly,
  hideExpires,
  snip,
  preventFocus,
}) => {
  const inputRef = useRef<ReactCodeMirrorRef>(null)
  const { setOpen } = useKmenu()
  const { theme } = useTheme()

  return (
    <div className='w-full flex flex-col items-start justify-center mt-10'>
      <div className='flex items-center justify-between w-full'>
        <button
          onClick={readOnly ? undefined : () => setOpen(2)}
          className={`flex items-center bg-white shadow-2xl dark:shadow-none dark:bg-gray-800 py-3 px-5 rounded mb-5 cursor-default text-sm ${
            !readOnly && 'interactive'
          }`}>
          <FiCode className='mr-2' />
          {hideExpires
            ? typeof language === 'undefined'
              ? 'Plain Text'
              : language
            : typeof snip === 'undefined'
            ? typeof language === 'undefined'
              ? 'Plain Text'
              : language
            : snip.language === null
            ? 'Plain Text'
            : snip.language}
        </button>
        {!hideExpires || (readOnly && snip?.expires_in !== null) ? (
          <button
            onClick={readOnly ? undefined : () => setOpen(3)}
            className={`flex items-center bg-white shadow-2xl dark:shadow-none dark:bg-gray-800 py-3 px-5 rounded mb-5 z-10 cursor-default text-sm ${
              !readOnly && 'interactive'
            }`}>
            {typeof snip === 'undefined'
              ? typeof expires === 'undefined'
                ? 'Never'
                : expires
              : snip.expires_in === null
              ? 'Never'
              : `Expires in ${snip.expires_in}`}
            <FiClock className='ml-2' />
          </button>
        ) : null}
      </div>
      <CodeMirror
        className={`w-full bg-white dark:bg-gray-800 ${readOnly && 'readonly'}`}
        height='700px'
        spellCheck='false'
        theme={theme === 'dark' ? dark : light}
        extensions={
          hideExpires
            ? typeof language === 'undefined'
              ? undefined
              : [langs[language]()]
            : typeof snip === 'undefined'
            ? typeof language === 'undefined'
              ? undefined
              : [langs[language]()]
            : snip.language === null
            ? undefined
            : [langs[snip.language as keyof typeof langs]()]
        }
        basicSetup={{
          autocompletion: false,
          searchKeymap: false,
          historyKeymap: false,
        }}
        readOnly={readOnly}
        value={snip?.code || ''}
        autoFocus={!preventFocus}
        ref={inputRef}
        onChange={
          typeof setCode === 'undefined' ? undefined : (value) => setCode(value)
        }
        data-gramm='false'
        data-gramm_editor='false'
        data-enable-grammarly='false'
      />
    </div>
  )
}

export default Editor
