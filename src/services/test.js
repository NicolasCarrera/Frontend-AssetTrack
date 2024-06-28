import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBU1NFVC1UUkFDSy1KV1QiLCJzdWIiOiIwMDAwMDAwMDAxIiwiYXV0aG9yaXRpZXMiOiJDUkVBVEUsUkVBRCxST0xFX0FETUlOSVNUUkFET1IiLCJpYXQiOjE3MTg4Mzk1ODIsImV4cCI6MTcxODg0MTM4MiwianRpIjoiMzQxN2NiMjYtODIwNi00MTMxLWIwNzAtMjM1YjI2YzNhODExIiwibmJmIjoxNzE4ODM5NTgyfQ.GqTjfCEP7AJ6HbT_iHWOYiTzTLDY4rRNhQHcVYZW3y8';

export const metodotest = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    };

    const response = await axios.get(`${API_ADDRESS}/test`, config);
    return response.data
}