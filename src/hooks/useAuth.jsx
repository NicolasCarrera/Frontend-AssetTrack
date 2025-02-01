import { useRecoilState } from 'recoil'
import { companyState, isAuthenticatedState, userState } from '../state/userAtom'
import { getCustomerByUserId } from '../services/customer-branches-service/customer'


export default function useAuth() {
  const [user, setUser] = useRecoilState(userState)
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState)

  const [, setCompany] = useRecoilState(companyState)

  const login = async (userData) => {
    setUser(userData)
    setIsAuthenticated(true)

    if (userData.roles.name === 'Usuario') {
      try {
        const customer = await getCustomerByUserId(userData.id)
        setCompany(customer)
        localStorage.setItem('company', JSON.stringify(customer))
      } catch (error) {
        console.error('Error fetching customer company:', error)
      }
    }
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setCompany(null)

    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('company')
  }

  const checkAuth = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    return storedUser && storedIsAuthenticated
  }

  return { user, isAuthenticated, login, logout, checkAuth }
}