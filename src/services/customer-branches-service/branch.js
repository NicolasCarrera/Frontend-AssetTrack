import axios from 'axios'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/branches`

export const getAllBranches = async () => {
  try {
    const response = await axios.get(`${API_ADDRESS}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getBranchById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createBranch = async (branchData) => {
  try {
    const response = await axios.post(`${API_ADDRESS}`, branchData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateBranch = async (id, branchData) => {
  try {
    const response = await axios.put(`${API_ADDRESS}/${id}`, branchData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteBranch = async (id) => {
  try {
    const response = await axios.delete(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getBranchesByCompanyId = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?companyId=${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}