import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultCompanyData } from '../../utils/objects/company'

const API_ADDRESS = `${import.meta.env.VITE_API_ADDRESS}/api/v1/customers`

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_ADDRESS}/companies`)
    return response.data.content
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/companies/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return defaultCompanyData
  }
}

export const createCustomer = async (customerData) => {
  try {
    const cleanedData = removeCircularReferences(customerData)
    const response = await axios.post(`${API_ADDRESS}/companies`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateCustomer = async (id, customerData) => {
  try {
    const cleanedData = removeCircularReferences(customerData)
    const response = await axios.put(`${API_ADDRESS}/companies/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_ADDRESS}/companies/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getCustomersByName = async (name) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/companies/name?name=${name}`)
    return response.data.content
  } catch (error) {
    console.error(error)
  }
}

export const getCustomerByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/companies/user/${userId}`)
    return response.data[0]
  } catch (error) {
    console.error(error)
    return defaultCompanyData
  }
}