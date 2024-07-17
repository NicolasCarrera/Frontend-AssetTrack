import { useState } from "react";
import Close from "../../assets/icons/Close";
import Search from "../../components/common/Search";

export default function SearchTechnician({ isOpen, onClose }) {

  const technicians = [
    { id: 1, avatar: '', name: 'Tecnico A' },
    { id: 2, avatar: '', name: 'Tecnico B' },
    { id: 3, avatar: '', name: 'Tecnico C' },
    { id: 4, avatar: '', name: 'Tecnico D' },
    { id: 5, avatar: '', name: 'Tecnico E' },
    { id: 6, avatar: '', name: 'Tecnico F' },
    { id: 7, avatar: '', name: 'Tecnico E' },
    { id: 8, avatar: '', name: 'Tecnico E' },
    { id: 9, avatar: '', name: 'Tecnico E' },
    { id: 10, avatar: '', name: 'Tecnico E' },
    { id: 11, avatar: '', name: 'Tecnico E' },
    { id: 12, avatar: '', name: 'Tecnico E' },
    { id: 13, avatar: '', name: 'Tecnico E' },
    { id: 14, avatar: '', name: 'Tecnico E' },
    { id: 15, avatar: '', name: 'Tecnico E' },
    { id: 16, avatar: '', name: 'Tecnico E' },
  ]

  const [technical, setTechnical] = useState({ id: null })

  const handleTechnical = (item) => {
    if (technical.id === item.id) {
      setTechnical({ id: null })
    } else {
      setTechnical(item)
    }
  }

  if (!isOpen) return null

  return (
    <div className='w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-black/50'>
      <div className="w-fit h-5/6 relative box-border rounded-md bg-[#0F0E17] text-[#FFFFFE] px-10 pt-10 pb-20">
        <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
          <Search />
          <button>
            <button onClick={onClose}>
              <Close />
            </button>
          </button>
        </div>
        <ul className='h-full overflow-y-auto'>
          {
            technicians.map(item => (
              <li
                className={`flex items-center justify-between py-2 hover:text-[#FF8906] ${technical.id === item.id ? 'text-[#FF8906]' : 'text-[#FFFFFE]'}`}
                key={item.id}
                onClick={() => handleTechnical(item)}
              >
                <span className="max-w-52 whitespace-pre-wrap">
                  {
                    item.name
                  }
                </span>
                {
                  technical.id === item.id &&
                  <button
                    className='bg-[#FF8906] text-[#FFFFFE] px-4 py-2 rounded-md'
                    onClick={() => { }}
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