import axios from 'axios'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/assets`

export const getAllAssetsByBranchId = async (branchId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?branchId=${branchId}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getAssetById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createAsset = async (assetData) => {
  try {
    const response = await axios.post(`${API_ADDRESS}`, assetData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateAsset = async (id, assetData) => {
  try {
    const response = await axios.put(`${API_ADDRESS}/${id}`, assetData)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteAsset = async (id) => {
  try {
    const response = await axios.delete(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllAssetsUnderMaintenanceByBranchId = async (branchId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?branchId=${branchId}`)
    // Filtrar los assets cuya propiedad maintenance.next no está vacía
    const assetsFiltrados = response.data.filter(asset =>
      asset.maintenance && asset.maintenance.next !== ''
    )
    return assetsFiltrados
  } catch (error) {
    console.error(error)
  }
}

export const getAssetsByFilter = async (branchId, filter) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?branchId=${branchId}&q=${filter}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}