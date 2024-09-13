import axios from 'axios'

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