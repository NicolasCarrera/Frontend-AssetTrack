import { NavLink } from 'react-router-dom'
import Tools from '../../assets/icons/Tools'
import Home from '../../assets/icons/Home'
import Users from '../../assets/icons/Users'
import Office from '../../assets/icons/Office'
import './styles.css'

export default function StickyNavbar() {
  return (
    <nav className='h-screen w-auto p-5 bg-[#0F0E17] text-[#FFFFFE]'>
      <div className='border-b-2 border-[#FFFFFE]/50 pb-3'>
        <Tools />
      </div>
      <ul className='my-5 flex flex-col gap-4 list-none'>
        <li>
          <NavLink to='/welcome' activeClassName='active'>
            <Home />
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' activeClassName='active'>
            <Users />
          </NavLink>
        </li>
        <li>
          <NavLink to='/customers' activeClassName='active'>
            <Office />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}