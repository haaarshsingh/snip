import { useEffect, useState } from 'react'

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false)
  const downHandler = ({
    key,
    shiftKey,
  }: {
    key: string
    shiftKey: boolean
  }): void => {
    if (key === targetKey && shiftKey) setKeyPressed(true)
  }

  const upHandler = ({ key }: { key: string }): void => {
    if (key === targetKey) setKeyPressed(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}

export default useKeyPress
