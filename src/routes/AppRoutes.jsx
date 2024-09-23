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
import Test from '../pages/Test'
import ReportView from '../pages/reports/ReportView'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
        <Route path='welcome' element={<Welcome />} />

        <Route path='users' element={
          <ProtectedRoute requiredPermission='users'>
            <ManageUser />
          </ProtectedRoute>
        } />

        <Route path='customers' element={
          <ProtectedRoute requiredPermission='customers'>
            <ManageCustomer />
          </ProtectedRoute>
        } />
        <Route path='customers/:customerId/branches' element={
          <ProtectedRoute requiredPermission='customers'>
            <ManageAsset />
          </ProtectedRoute>
        } />
        <Route path='customers/:customerId/branches/:branchId/asset/:assetId' element={
          <ProtectedRoute requiredPermission='customers'>
            <ManageMaintenance />
          </ProtectedRoute>
        } />

        <Route path='work-order' element={
          <ProtectedRoute requiredPermission='work-order'>
            <ManageWorkOrder />
          </ProtectedRoute>
        } />

      </Route>

      <Route path='reports/:reportId' element={
        <ProtectedRoute requiredPermission='reports'>
          <ReportView />
        </ProtectedRoute>
      } />

      <Route path='/test' element={<Test />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}