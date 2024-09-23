import { NavLink, useNavigate } from 'react-router-dom'
import Tools from '../../assets/icons/Tools'
import Home from '../../assets/icons/Home'
import Users from '../../assets/icons/Users'
import Office from '../../assets/icons/Office'
import ToolTip from './ToolTip'
import Clipboard from '../../assets/icons/Clipboard'
import Exit from '../../assets/icons/Exit'
import useAuth from '../../hooks/useAuth'
import useRolePermissions from '../../hooks/useRolePermissions'
import { companyState } from '../../state/userAtom'
import { useRecoilState } from 'recoil'
import Tooth from '../../assets/icons/Tooth'

export default function StickyNavbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { hasPermission } = useRolePermissions()
  const [company,] = useRecoilState(companyState)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='flex flex-col justify-between h-screen w-auto p-5 bg-[#0F0E17] text-[#FFFFFE]'>
      <div>
        <div className='border-b-2 border-[#FFFFFE]/50 pb-3'>
          <Tools />
        </div>
        <ul className='my-5 flex flex-col gap-4 list-none'>
          <li>
            <NavLink
              to='/welcome'
              className={({ isActive }) => (isActive ? 'text-[#FF8906]' : 'text-[#FFFFFE]')}
            >
              <ToolTip tooltip='Inicio'>
                <Home />
              </ToolTip>
            </NavLink>
          </li>
          {
            hasPermission('users') &&
            <li>
              <NavLink
                to='/users'
                className={({ isActive }) => (isActive ? 'text-[#FF8906]' : 'text-[#FFFFFE]')}
              >
                <ToolTip tooltip='Gestión de usuarios'>
                  <Users />
                </ToolTip>
              </NavLink>
            </li>
          }
          {
            hasPermission('customers') &&
            <li>
              <NavLink
                to='/customers'
                className={({ isActive }) => (isActive ? 'text-[#FF8906]' : 'text-[#FFFFFE]')}
              >
                <ToolTip tooltip='Gestión de clientes'>
                  <Office />
                </ToolTip>
              </NavLink>
            </li>
          }
          {
            hasPermission('assets') &&
            <li>
              <NavLink
                to={`/customers/${company?.id}/branches`}
                className={({ isActive }) => (isActive ? 'text-[#FF8906]' : 'text-[#FFFFFE]')}
              >
                <ToolTip tooltip='Gestión de activos'>
                  <Tooth />
                </ToolTip>
              </NavLink>
            </li>
          }
          {
            hasPermission('work-order') &&
            <li>
              <NavLink
                to='/work-order'
                className={({ isActive }) => (isActive ? 'text-[#FF8906]' : 'text-[#FFFFFE]')}
              >
                <ToolTip tooltip='Ordenes de trabajo'>
                  <Clipboard />
                </ToolTip>
              </NavLink>
            </li>
          }
        </ul>
      </div>
      <div className='hover:text-[#FF8906]'>
        <button onClick={handleLogout}>
          <ToolTip tooltip='Salir'>
            <Exit />
          </ToolTip>
        </button >
      </div>
    </nav>
  )
}