import { UserResponse } from '@supabase/supabase-js'
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from 'react'
import supabase from './supabase'

export type UserContextType = { user: UserResponse | null; logout: () => void }
const UserContext = createContext<UserContextType>({} as UserContextType)

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null)

  useEffect(() => {
    const getData = async () => {
      const profile = await supabase.auth.getUser()
      setUser(profile)
    }
    getData()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
export default UserProvider
