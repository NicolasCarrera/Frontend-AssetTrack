import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'

const API_ADDRESS = `${import.meta.env.VITE_API_ADDRESS}/api/v1/work-orders`

export const getAllWorkOrders = async () => {
  try {
    const response = await axios.get(`${API_ADDRESS}/`)
    return response.data.content
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getWorkOrdersByAssetId = async (assetId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/assets/${assetId}`)
    return response.data.content
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getWorkOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}users/${userId}`)
    return response.data.content
  } catch (error) {
    console.error(error)
    return []
  }
}

export const cleateWorkOrder = async (workOrderData) => {
  try {
    const response = await axios.post(`${API_ADDRESS}/`, workOrderData)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const updateWorkOrder = async (id, workOrderData) => {
  try {
    const cleanedData = removeCircularReferences(workOrderData)
    const response = await axios.put(`${API_ADDRESS}/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const deleteWorkOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}