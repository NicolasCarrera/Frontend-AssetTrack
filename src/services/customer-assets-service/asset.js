import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS

export const getNumberOfAssetsByCustomer = async (branchId) => {
    const response = await axios.get(`${API_ADDRESS}/api/v1/assets/activos/sucursal/${branchId}/contar`)
    return response.data
}