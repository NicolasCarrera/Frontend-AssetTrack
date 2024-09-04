import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function useDecodeJWT(token) {
  const [decodedToken, setDecodedToken] = useState(null)

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setDecodedToken(decoded)
      } catch (error) {
        console.error('Invalid token', error)
        setDecodedToken(null)
      }
    }
  }, [token])

  return decodedToken
}