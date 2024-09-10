import { useEffect, useRef, useState } from 'react'

export default function Dropdown({ children, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClick = (event) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className='relative'>
      <div>
        <button
          onClick={handleClick}
        >
          {children}
        </button>
      </div>
      {
        isOpen &&
        <ul className='fixed bg-[#0F0E17] text-[#FFFFFE] rounded-md shadow-lg'>
          {
            options.map((option, index) => (
              <li
                className='px-4 py-2 hover:text-[#FF8906] cursor-pointer whitespace-nowrap'
                key={index}
                onClick={() => setIsOpen(false)}
              >
                {option}
              </li>
            ))
          }
        </ul>
      }
    </div>
  )
}