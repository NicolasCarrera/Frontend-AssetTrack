import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS

export const getAllRoles = async () => {
    const response = await axios.get(`${API_ADDRESS}/role`)
    return response.data
}