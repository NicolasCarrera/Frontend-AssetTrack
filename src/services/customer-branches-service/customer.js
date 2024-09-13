import axios from 'axios'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/companies`

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_ADDRESS}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_ADDRESS}`, customerData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(`${API_ADDRESS}/${id}`, customerData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getCustomersByName = async (name) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?name_like=${name}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
