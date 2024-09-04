import { Navigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isAuthenticatedState } from '../state/userAtom'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}