import { useRecoilValue } from 'recoil'
import { userState } from '../state/userAtom'

const rolePermissions = {
  'Gerente de Mantenimiento': ['users', 'customers', 'work-order', 'reports'],
  'Técnico de Mantenimiento': ['work-order', 'reports'],
  'Usuario': ['assets', 'reports']
}

export default function useRolePermissions() {
  const user = useRecoilValue(userState)

  const hasPermission = (permission) => {
    if (!user || !user.roles) return false
    return user.roles.some(role => rolePermissions[role]?.includes(permission))
  }

  return { hasPermission }
}