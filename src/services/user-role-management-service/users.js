import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${API_ADDRESS}/auth/log-in`, {
    username: username,
    password: password,
  })
  return response.data
}