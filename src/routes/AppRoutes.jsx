import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Welcome from '../pages/home/Welcome'
import ManageUser from '../pages/user-management/ManageUser'
import { useEffect, useState } from 'react'
import ProtectedRoute from './ProtectedRoute'
import ManageCustomer from '../pages/customer-management/ManageCustomer'
import ManageAsset from '../pages/asset-management/ManageAsset'

export default function AppRoutes() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const newUser = sessionStorage.getItem('user')
    setUser(newUser)
  }, [])

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />}>
        <Route index element={<ProtectedRoute redirectTo='/login' isAllowed={!!user}><Home /></ProtectedRoute>} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/users' element={<ManageUser />} />
        <Route path='/customers' element={<ManageCustomer />} />
        <Route path='/customers/:customerId/branch/:branchId/assets' element={<ManageAsset />} />
      </Route>
    </Routes>
  )
}