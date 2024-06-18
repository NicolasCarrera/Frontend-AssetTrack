import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/user-role-management-service/users'

export default function Login() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const identification = event.target.elements.identification.value
    const password = event.target.elements.password.value

    const logged = await loginUser(identification, password)

    if (!logged) {
      setErrorMessage('El usuario o la contraseña son incorrectos')
      return
    }

    navigate('/welcome')
  }

  return (
    <div className='bg-[#0F0E17] min-h-screen flex items-center justify-center'>
      <form
        className='w-full max-w-xs space-y-8 text-[#FFFFFE]'
        onSubmit={handleLogin}>
        {
          errorMessage && <p>{errorMessage}</p>
        }
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
