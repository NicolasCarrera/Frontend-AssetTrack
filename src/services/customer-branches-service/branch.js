import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultBranchData } from '../../utils/objects/branch'

const API_ADDRESS = `${import.meta.env.VITE_API_ADDRESS}/api/v1/customers`

export const getAllBranches = async () => {
  try {
    const response = await axios.get(`${API_ADDRESS}/branches`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getBranchById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/branches/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return defaultBranchData
  }
}

export const createBranch = async (branchData) => {
  try {
    const response = await axios.post(`${API_ADDRESS}/branches`, branchData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateBranch = async (id, branchData) => {
  try {
    const cleanedData = removeCircularReferences(branchData)
    const response = await axios.put(`${API_ADDRESS}/branches/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`${API_ADDRESS}/branches/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getBranchesByCompanyId = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/branches/company/${id}`)
    return response.data.content
  } catch (error) {
    console.error(error)
  }
}