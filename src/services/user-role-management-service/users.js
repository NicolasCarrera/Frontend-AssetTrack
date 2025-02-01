import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultUserData } from '../../utils/objects/user'

const API_ADDRESS = `${import.meta.env.VITE_API_ADDRESS}/api/v1/users`

export const loginUser = async (identification, password) => {
  try {
    const response = await axios.post(`${API_ADDRESS}/login`, {
      identification,
      password
    })

    const tokenUser = response.data
    if (tokenUser) {
      return tokenUser
    } else {
      throw new Error('Credenciales inválidas')
    }
  } catch (error) {
    console.error('Error en el login:', error)
    throw error
  }
}

export const createUser = async (userData) => {
  console.log("Create User", userData);
  const response = await axios.post(`${API_ADDRESS}/`, userData)
  return response.data
}

export const updateUser = async (id, userData) => {
  const cleanedData = removeCircularReferences(userData)
  const response = await axios.put(`${API_ADDRESS}/${id}`, cleanedData)
  return response.data
}

export const getAllUsers = async (page, size) => {
  const response = await axios.get(`${API_ADDRESS}/?page=${page || 0}&size=${size || 10}`)
  return response.data.content
}

export const deleteUsers = async (id) => {
  const response = await axios.delete(`${API_ADDRESS}/${id}`)
  return response.data
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error);
    return defaultUserData
  }
}

export const getUserByRole = async (role) => {
  const response = await axios.get(`${API_ADDRESS}/role/${role}`)
  return response.data
}

export const getUserByFilter = async (filter) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/filter?filter=${filter}`)
    return response.data.content
  } catch (error) {
    console.error(error)
    return []
  }
}