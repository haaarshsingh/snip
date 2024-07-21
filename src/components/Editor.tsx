'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { BsTextWrap } from 'react-icons/bs'
import { HiMiniHashtag } from 'react-icons/hi2'
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx'
import {
  TbArrowBackUpDouble,
  TbClockEdit,
  TbCode,
  TbEye,
  TbLinkPlus,
  TbLock,
  TbPlus,
  TbX,
} from 'react-icons/tb'
import Textarea, { Statistics } from '@uiw/react-codemirror'
import { EditorView } from 'codemirror'
import clsx from 'clsx'
import languages from '@/utils/languages'
import theme from '@/utils/theme'

export default () => {
  const [stats, setStats] = useState<Statistics>()
  const [value, setValue] = useState('')

  const [wrap, setWrap] = useState(false)
  const [numbers, setNumbers] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    console.log(stats?.selection)
  }, [stats?.selection])

  const onChange = useCallback((val: string) => {
    setValue(val)
  }, [])

  return (
    <main
      className={clsx(
        fullscreen ? 'fixed top-0 left-0 w-screen h-screen' : 'my-16'
      )}
    >
      <div
        className={clsx(
          'bg-neutral-950',
          !fullscreen && 'border-neutral-800 border rounded-lg'
        )}
      >
        <div className='flex justify-between items-center px-4 py-2'>
          <input
            placeholder='Untitled Snip'
            className='bg-transparent text-sm outline-none'
          />
          <div className='flex items-center justify-between gap-x-0.5 text-lg'>
            <button className='hover:bg-neutral-50/10 rounded-md p-1.5 text-neutral-400'>
              <TbArrowBackUpDouble />
            </button>
            <button
              className={clsx(
                'hover:bg-neutral-50/10 rounded-md p-1.5',
                wrap ? 'text-neutral-400' : 'text-neutral-600'
              )}
              onClick={() => setWrap((wrap) => !wrap)}
            >
              <BsTextWrap />
            </button>
            <button
              className={clsx(
                'hover:bg-neutral-50/10 rounded-md p-1.5',
                numbers ? 'text-neutral-400' : 'text-neutral-600'
              )}
              onClick={() => setNumbers((numbers) => !numbers)}
            >
              <HiMiniHashtag />
            </button>
            <button
              className='hover:bg-neutral-50/10 rounded-md p-1.5 text-neutral-400'
              onClick={() => setFullscreen((fullscreen) => !fullscreen)}
            >
              {fullscreen ? <RxExitFullScreen /> : <RxEnterFullScreen />}
            </button>
          </div>
        </div>
        <Tabs fullscreen={fullscreen} />
        <Textarea
          value={value}
          height={fullscreen ? '75.5vh' : '500px'}
          onChange={onChange}
          theme={theme}
          extensions={[
            [languages['TSX']()],
            wrap ? EditorView.lineWrapping : [],
          ]}
          autoFocus
          basicSetup={{
            autocompletion: false,
            searchKeymap: false,
            historyKeymap: false,
            lineNumbers: numbers ? true : false,
          }}
          onStatistics={(s) => setStats(s)}
        />
        <div className='border-t border-t-neutral-800 py-2 flex justify-between px-3 items-center'>
          <div className='text-xs'>
            <span>
              Ln {stats?.line.number}, Col {stats?.line.length}
            </span>
            <button className='text-xs hover:bg-neutral-50/10 rounded ml-1 py-1.5 pl-2 pr-2.5'>
              Spaces: {stats?.tabSize}
            </button>
          </div>
          <button className='flex items-center text-xs hover:bg-neutral-50/10 rounded py-1.5 pl-2 pr-2.5'>
            <TbCode className='mt-px mr-1.5' />
            <span>Autodetect</span>
          </button>
        </div>
        <div className='border-t border-t-neutral-800 px-3 py-3 flex flex-row-reverse justify-between items-center'>
          <button className='text-sm bg-neutral-50 hover:bg-neutral-200 transition-colors text-neutral-950 rounded-md px-3 py-2'>
            Create Snip (⌘S)
          </button>
          <div>
            <button className='hover:bg-neutral-50/10 rounded-md p-1.5'>
              <TbLinkPlus />
            </button>
            <button className='hover:bg-neutral-50/10 rounded-md p-1.5'>
              <TbClockEdit />
            </button>
            <button className='hover:bg-neutral-50/10 rounded-md p-1.5'>
              <TbLock />
            </button>
            <button
              className='enabled:hover:bg-neutral-50/10 rounded-md p-1.5 disabled:text-neutral-700 cursor-not-allowed'
              disabled
            >
              <TbEye />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

const Tabs: FC<{ fullscreen: boolean }> = ({ fullscreen }) => {
  const [tabs, setTabs] = useState([{ id: 1, title: 'Untitled File' }])
  const [selectedTab, setSelectedTab] = useState(1)

  const addTab = () => {
    const newId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1
    setTabs([...tabs, { id: newId, title: 'Untitled File' }])
    setSelectedTab(newId)
  }

  const removeTab = (id: number) => {
    if (tabs.length === 1) return
    setTabs(tabs.filter((tab) => tab.id !== id))
    if (selectedTab === id && tabs.length > 1) setSelectedTab(tabs[0].id)
  }

  const updateTabTitle = (id: number, newTitle: string) => {
    setTabs(
      tabs.map((tab) => (tab.id === id ? { ...tab, title: newTitle } : tab))
    )
  }

  return (
    <div className='border-t mb-2 border-b border-t-neutral-800 border-b-neutral-800 p-2 flex items-center justify-between'>
      <div
        className={clsx(
          'flex items-center gap-x-1',
          fullscreen
            ? 'w-tabs overflow-x-scroll'
            : 'max-w-[638px] overflow-hidden'
        )}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={clsx(
              'px-2 py-1.5 rounded-md flex items-center cursor-pointer',
              selectedTab === tab.id
                ? 'bg-neutral-900'
                : 'hover:bg-neutral-900/75'
            )}
            role='tab'
            aria-selected={selectedTab === tab.id}
            tabIndex={0}
            onClick={() => setSelectedTab(tab.id)}
            style={{
              width: fullscreen
                ? '100%'
                : (590 - (tabs.length > 3 ? tabs.length * 4 - 4 : 8)) /
                  (tabs.length > 3 ? tabs.length : 3),
            }}
          >
            {selectedTab !== tab.id ? (
              <span
                className={clsx(
                  'text-xs ml-1 mr-2 w-full text-neutral-600 truncate select-none',
                  fullscreen && 'min-w-16'
                )}
              >
                {tab.title === '' ? 'Untitled File' : tab.title}
              </span>
            ) : (
              <input
                value={tab.title === 'Untitled File' ? '' : tab.title}
                onChange={(e) => updateTabTitle(tab.id, e.target.value)}
                placeholder='Untitled File'
                className={clsx(
                  'text-xs bg-transparent outline-none ml-1 mr-2 w-full',
                  fullscreen && 'min-w-16'
                )}
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeTab(tab.id)
              }}
              className='text-sm text-neutral-600 hover:bg-neutral-50/5 hover:text-neutral-400 transition-colors p-1 rounded'
            >
              <TbX />
            </button>
          </div>
        ))}
        <button
          onClick={addTab}
          className='flex items-center justify-center hover:bg-neutral-50/10 rounded-md p-1.5'
        >
          <TbPlus />
        </button>
      </div>
    </div>
  )
}
