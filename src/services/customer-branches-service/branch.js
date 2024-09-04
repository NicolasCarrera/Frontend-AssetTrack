import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS

export const createBranch = async () => {
    const branch = {
        id: null,
        nombre: 'Sucursal de prueba',
        direccion: 'Direccion de prueba',
        telefono: 'Telefono de prueba',
        email: 'prueba@email.com',
        numeroEmpleados: 0,
        numeroActivos: 0,
        empresaId: 1
    }
    try {
        const response = await axios.post(`${API_ADDRESS}/api/v1/customers/sucursales`, branch)
        return response.data
    } catch (error) {
        console.error(error)
    }
}