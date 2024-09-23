import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultUserData } from '../../utils/objects/user'

const API_ADDRESS = import.meta.env.VITE_JSON_SERVER

export const loginUser = async (identification, password) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/users`)
    const users = response.data
    const user = users.find(u => (u.email === identification || u.document.value === identification) && u.password === password)
    if (user) {
      const token = btoa(JSON.stringify({ ...user, password: undefined }))
      return token
    } else {
      throw new Error('Credenciales inválidas')
    }
  } catch (error) {
    console.error('Error en el login:', error)
    throw error
  }
}

export const createUser = async (userData) => {
  const cleanedData = removeCircularReferences(userData)
  const response = await axios.post(`${API_ADDRESS}/users`, cleanedData)
  return response.data
}

export const updateUser = async (id, userData) => {
  const cleanedData = removeCircularReferences(userData)
  const response = await axios.put(`${API_ADDRESS}/users/${id}`, cleanedData)
  return response.data
}

export const getAllUsers = async (page, size) => {
  const response = await axios.get(`${API_ADDRESS}/users?_page=${page}&_limit=${size}`)
  return response.data
}

export const deleteUsers = async (id) => {
  const response = await axios.delete(`${API_ADDRESS}/users/${id}`)
  return response.data
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error);
    return defaultUserData
  }
}

export const getUserByRole = async (role) => {
  const response = await axios.get(`${API_ADDRESS}/users?roles=${role}`)
  return response.data
}

export const getUserByFilter = async (filter) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/users?q=${filter}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}