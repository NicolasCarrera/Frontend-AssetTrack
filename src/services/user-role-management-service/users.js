import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_JSON_SERVER

export const loginUser = async (identification, password) => {
  const response = await axios.get(`${API_ADDRESS}/auth`)
  return response.data.token
}

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_ADDRESS}/users`, userData)
  console.log('Usuario creado:', response.data)
  return response.data
}

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_ADDRESS}/users/${id}`, userData)
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
  const response = await axios.get(`${API_ADDRESS}/users/${id}`)
  return response.data
}

export const getUserByRole = async (role) => {
  const response = await axios.get(`${API_ADDRESS}/users?roles=${role}`)
  return response.data
}