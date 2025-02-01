import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultReportData } from '../../utils/objects/report'

const API_ADDRESS = `${import.meta.env.VITE_API_ADDRESS}/api/v1/maintenance`

export const getReportsByAssetId = async (assetId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/reports/assets/${assetId}`)
    return response.data.content
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getReportsById = async (id) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/reports/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return defaultReportData
  }
}

export const cleateReport = async (reportData) => {
  try {
    //const cleanedData = removeCircularReferences(reportData)
    const response = await axios.post(`${API_ADDRESS}/reports`, reportData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateReport = async (id, reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.put(`${API_ADDRESS}/reports/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}