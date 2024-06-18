import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Welcome from '../pages/home/Welcome'
import ManageUser from '../pages/user-management/ManageUser'

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} >
        <Route path='welcome' element={<Welcome />} />
        <Route path='users' element={<ManageUser />} />
      </Route>
    </Routes>
  )
}