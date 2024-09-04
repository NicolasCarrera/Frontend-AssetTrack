import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/user-role-management-service/users'
import useDecodeJWT from '../../hooks/useDecodeJWT'
import Alert from '../../components/common/Alert'
import useAuth from '../../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  const [error, setError] = useState({ title: '', message: [] })

  const { login } = useAuth()

  const handleLogin = async (event) => {
    event.preventDefault()
    const identification = event.target.elements.identification.value
    const password = event.target.elements.password.value

    try {
      const fetchedToken = await loginUser(identification, password)
      setToken(fetchedToken)
      setError({ title: '', message: [] })
    } catch (error) {
      console.error('Failed to fetch token:', error)
      setError({ title: 'Error al iniciar sesión', message: ['Inténtalo de nuevo.'] })
      setToken(null)
    }
  }

  const decodedToken = useDecodeJWT(token)

  useEffect(() => {
    if (decodedToken) {
      login(decodedToken)
      navigate('/welcome')
    }
  }, [decodedToken])

  return (
    <div className='bg-[#0F0E17] min-h-screen flex items-center justify-center'>
      <Alert title={error.title} message={error.message} />
      <form
        className='w-full max-w-xs space-y-8 text-[#FFFFFE]'
        onSubmit={handleLogin}>
        <h1 className='mb-12 text-center text-5xl font-extrabold tracking-tight'>Asset Track</h1>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium'>
            Numero de identificación
          </span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            name='identification'
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium'>
            Contraseña
          </span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='password'
            name='password'
            required />
        </label>

        <button
          className='block w-full px-4 py-2 rounded-md bg-[#FF8906]'
          type='submit'>
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
