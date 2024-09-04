import axios from 'axios'

const API_ADDRESS = import.meta.env.VITE_API_ADDRESS
const JSON_SERVER = import.meta.env.VITE_JSON_SERVER

export const loginUser = async (identification, password) => {
  // API_URL
  // const response = await axios.post(`${API_ADDRESS}/auth/log-in`, {
  //   identification: identification,
  //   password: password,
  // })

  // JSON_SERVER
  const response = await axios.get(`${JSON_SERVER}/token`)
  return response.data
}

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_ADDRESS}/auth/sign-up`, userData)
  return normalizeUserData(response.data)
}

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_ADDRESS}/user/${id}`, userData)
  return normalizeUserData(response.data)
}

export const getAllUsers = async (page, size) => {
  const response = await axios.get(`${API_ADDRESS}/user`, {
    params: {
      page: page,
      size: size
    }
  })
  return {
    users: response.data.content.map(user => (normalizeUserData(user))),
    page: {
      numbre: response.data.number,
      size: response.data.size,
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPages
    }
  }
}

export const getUserById = async (id) => {
  const response = await axios.get(`${API_ADDRESS}/user/${id}`)
  return normalizeUserData(response.data)
}

const normalizeUserData = (userData) => {
  return {
    id: userData.id,
    avatar: `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${userData.names}`,
    username: `${userData.names} ${userData.lastName}`,
    names: userData.names,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    documents: userData.identityDocuments.map(document => ({
      id: document.id,
      type: document.documentType,
      value: document.identification
    })),
    status: userData.status,
    roles: userData.roles.map(role => ({
      id: role.id,
      roleName: role.roleName,
      permissions: role.permissions.map(permission => ({
        id: permission.id,
        permissionName: permission.permissionName
      }))
    }))
  }
}