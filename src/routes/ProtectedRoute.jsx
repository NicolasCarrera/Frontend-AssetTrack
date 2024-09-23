import { Navigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isAuthenticatedState } from '../state/userAtom'
import useRolePermissions from '../hooks/useRolePermissions'

export default function ProtectedRoute({ children, requiredPermission }) {
  const location = useLocation()
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const { hasPermission } = useRolePermissions()

  if (!isAuthenticated && !hasPermission(requiredPermission)) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }
  return children
}