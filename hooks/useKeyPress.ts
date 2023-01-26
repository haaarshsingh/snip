import { useCallback, useEffect, useState } from 'react'

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback(
    ({ key, shiftKey }: { key: string; shiftKey: boolean }): void => {
      if (key === targetKey && shiftKey) setKeyPressed(true)
    },
    [targetKey]
  )

  const upHandler = useCallback(
    ({ key }: { key: string }): void => {
      if (key === targetKey) setKeyPressed(false)
    },
    [targetKey]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [downHandler, upHandler])

  return keyPressed
}

export default useKeyPress
