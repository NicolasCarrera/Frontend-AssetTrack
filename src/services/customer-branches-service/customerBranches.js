import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_JSON_SERVER

export const getBranchesByClient = async (customerId) => {
  try {
    const response = await axios.get(`${API_ADDRESS}/companies/${customerId}?_embed=branches`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}