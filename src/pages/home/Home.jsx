import { Outlet, useNavigate } from 'react-router-dom'
import StickyNavbar from '../../components/common/StickyNavbar'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/welcome');
  }, [])
  return (
    <div className='min-h-screen flex'>
      <StickyNavbar />
      <main className='relative overflow-auto max-h-screen w-full py-10 px-5 md:px-10 lg:px-20 bg-[#FFFFFE]'>
        <Outlet />
      </main>
    </div>
  )
}