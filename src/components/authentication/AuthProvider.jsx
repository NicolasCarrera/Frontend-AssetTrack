import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useRecoilState } from 'recoil'
import { isAuthenticatedState, userState } from '../../state/userAtom'
import LoadingPage from '../../pages/loading/LoadingPage'

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const { checkAuth } = useAuth()
  const [, setIsAuthenticated] = useRecoilState(isAuthenticatedState)
  const [, setUser] = useRecoilState(userState)

  useEffect(() => {
    const initAuth = async () => {
      const authResult = checkAuth()
      if (authResult) {
        setIsAuthenticated(true)
        setUser(JSON.parse(localStorage.getItem('user')))
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return children
}