import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'
import { defaultCorrectiveReportData } from '../../utils/objects/correctiveReport'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/correctiveReport`

export const getCorrectiveReportByReporId = async (reportId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}?reportId=${reportId}`)
    return response.data[0]
  } catch (error) {
    return defaultCorrectiveReportData
  }
}

export const cleateCorrectiveReport = async (reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.post(`${API_ADDRESS}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateCorrectiveReport = async (id, reportData) => {
  try {
    const cleanedData = removeCircularReferences(reportData)
    const response = await axios.put(`${API_ADDRESS}/${id}`, cleanedData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}