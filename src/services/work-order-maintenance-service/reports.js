import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultReportData } from '../../utils/objects/report'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/reports`

export const getReportsByAssetId = async (assetId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?_sort=date&_order=desc&assetId=${assetId}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getReportsById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return defaultReportData
  }
}

export const cleateReport = async (reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.post(`${API_ADDRESS}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateReport = async (id, reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.put(`${API_ADDRESS}/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}