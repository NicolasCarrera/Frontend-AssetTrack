import axios from 'axios'
import { removeCircularReferences } from '../../utils/fix'

const API_ADDRESS = `${import.meta.env.VITE_JSON_SERVER}/work-orders`

export const getAllWorkOrders = async () => {
    try {
        const response = await axios.get(`${API_ADDRESS}?_sort=date`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getWorkOrdersByAssetId = async (assetId) => {
    try {
        const response = await axios.get(`${API_ADDRESS}?_sort=date&assetId=${assetId}`)
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