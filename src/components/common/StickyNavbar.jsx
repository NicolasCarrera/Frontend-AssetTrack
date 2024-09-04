import { NavLink } from 'react-router-dom'
import Tools from '../../assets/icons/Tools'
import Home from '../../assets/icons/Home'
import Users from '../../assets/icons/Users'
import Office from '../../assets/icons/Office'
import './styles.css'
import ToolTip from './ToolTip'
import Clipboard from '../../assets/icons/Clipboard'
import Exit from '../../assets/icons/Exit'

export default function StickyNavbar() {
  return (
    <nav className='flex flex-col justify-between h-screen w-auto p-5 bg-[#0F0E17] text-[#FFFFFE]'>
      <div>
        <div className='border-b-2 border-[#FFFFFE]/50 pb-3'>
          <Tools />
        </div>
        <ul className='my-5 flex flex-col gap-4 list-none'>
          <li>
            <NavLink to='/welcome' activeClassName='active'>
              <ToolTip tooltip='Inicio'>
                <Home />
              </ToolTip>
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' activeClassName='active'>
              <ToolTip tooltip='Gestión de usuarios'>
                <Users />
              </ToolTip>
            </NavLink>
          </li>
          <li>
            <NavLink to='/customers' activeClassName='active'>
              <ToolTip tooltip='Gestión de clientes'>
                <Office />
              </ToolTip>
            </NavLink>
          </li>
          <li>
            <NavLink to='/work-order' activeClassName='active'>
              <ToolTip tooltip='Ordenes de trabajo'>
                <Clipboard />
              </ToolTip>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='hover:text-[#FF8906]'>
        <NavLink to='/login'>
          <ToolTip tooltip='Salir'>
            <Exit />
          </ToolTip>
        </NavLink>
      </div>
    </nav>
  )
}