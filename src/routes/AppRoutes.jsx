import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Welcome from '../pages/home/Welcome'
import ManageUser from '../pages/user-management/ManageUser'
import ProtectedRoute from './ProtectedRoute'
import ManageCustomer from '../pages/customer-management/ManageCustomer'
import ManageAsset from '../pages/asset-management/ManageAsset'
import ManageMaintenance from '../pages/maintenance-management/ManageMaintenance'
import ManageWorkOrder from '../pages/work-order-management/ManageWorkOrder'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
        <Route path='/welcome' element={<Welcome />} />

        <Route path='/users' element={<ManageUser />} />

        <Route path='/customers' element={<ManageCustomer />} />
        <Route path='/customers/:customerId/branches' element={<ManageAsset />} />
        <Route path='/customers/:customerId/branches/:branchId/asset/:assetId' element={<ManageMaintenance />} />

        <Route path='work-order' element={<ManageWorkOrder />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}