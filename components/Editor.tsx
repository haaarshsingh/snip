import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { theme } from '@lib/theme'
import langs from '@lib/languages'
import { useKmenu } from 'kmenu'

const Form: FC<{
  language: keyof typeof langs
}> = ({ language }) => {
  const inputRef = useRef<ReactCodeMirrorRef>(null)
  const [input, setInput, open, setOpen] = useKmenu()

  useEffect(() => {
    if (open === 0) inputRef.current?.editor?.focus()
  }, [open])

  return (
    <div className='w-full flex justify-center mt-10'>
      <CodeMirror
        className='w-full bg-gray-900'
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
