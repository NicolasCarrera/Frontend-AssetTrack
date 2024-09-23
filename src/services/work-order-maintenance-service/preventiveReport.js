import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultPreventiveReportData } from '../../utils/objects/preventiveReport'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/preventiveReport`

export const getPreventiveReportByReporId = async (reportId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?reportId=${reportId}`)
    return response.data[0]
  } catch (error) {
    return defaultPreventiveReportData
  }
}

export const cleatePreventiveReport = async (reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.post(`${API_ADDRESS}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updatePreventiveReport = async (id, reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.put(`${API_ADDRESS}/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}