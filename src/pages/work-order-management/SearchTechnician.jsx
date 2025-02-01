import { useEffect, useState } from 'react';
import Close from '../../assets/icons/Close';
import Search from '../../components/common/Search';
import { defaultUserData } from '../../utils/objects/user';
import { getUserByRole } from '../../services/user-role-management-service/users';

export default function SearchTechnician({ isOpen, onClose, onClick }) {
  const [dataTechnicians, setDataTechnicians] = useState([defaultUserData])
  const [technical, setTechnical] = useState(defaultUserData)

  useEffect(() => {
    const fetchTechniciansData = async () => {
      const newDataTechnicians = await getUserByRole('Técnico de Mantenimiento')
      setDataTechnicians(newDataTechnicians)
    }
    fetchTechniciansData()
  }, [])

  const handleTechnical = (item) => {
    if (technical.id === item.id) {
      setTechnical({ id: null })
    } else {
      setTechnical(item)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onClick(technical)
  }

  if (!isOpen) return null

  return (
    <div className='w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-black/50'>
      <div className='w-[500px] h-5/6 relative box-border rounded-md shadow-lg bg-[#0F0E17] text-[#FFFFFE] px-10 pt-10 pb-20'>
        <div className='flex flex-row-reverse mb-5'>
          <button>
            <button onClick={onClose}>
              <Close />
            </button>
          </button>
        </div>
        <ul className='h-full overflow-y-auto'>
          {
            dataTechnicians.map(item => (
              <li
                className={`flex items-center justify-between gap-4 py-2 hover:text-[#FF8906] ${technical.id === item.id ? 'text-[#FF8906]' : 'text-[#FFFFFE]'}`}
                key={item.id}
                onClick={() => handleTechnical(item)}
              >
                <span className='max-w-52 whitespace-pre-wrap'>
                  {
                    `${item.firstName} ${item.lastName}`
                  }
                </span>
                {
                  technical.id === item.id &&
                  <button
                    className='bg-[#FF8906] text-[#FFFFFE] px-4 py-2 rounded-md'
                    onClick={handleSubmit}
                  >
                    Asignar
                  </button>
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}