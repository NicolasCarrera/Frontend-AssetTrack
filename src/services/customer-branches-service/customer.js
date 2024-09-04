import axios from 'axios'
import { getNumberOfAssetsByCustomer } from '../customer-assets-service/asset'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${API_ADDRESS}/api/v1/customers/empresas`)

        return response.data.map(({ id, nombre }) => ({
            id: id,
            name: nombre
        }))

    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export const getBranchByCustomerId = async (id) => {
    try {
        const response = await axios.get(`${API_ADDRESS}/api/v1/customers/empresas/${id}/sucursales`)

        const normalizedData = await Promise.all(response.data.map(async ({ id, nombre, direccion }) => {
            try {
                const assetsResponse = await getNumberOfAssetsByCustomer(id)
                return {
                    id,
                    name: nombre,
                    address: direccion,
                    assets: assetsResponse
                }
            } catch (error) {
                console.error(`Error fetching assets for company ${id}:`, error)
                return {
                    id,
                    name: nombre,
                    address: direccion,
                    assets: 0
                }
            }
        }))
        return normalizedData
    } catch (error) {
        console.error('Error fetching data:', error)
        return []
    }
}

export const createCustomer = async (customer) => {
    try {
        const response = await axios.post(`${API_ADDRESS}/api/v1/customers/empresas`, customer)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const test = async () => {
    const response = await axios.post(`${API_ADDRESS}/api/v1/customers/empresas/test`)
    console.log(response);
}