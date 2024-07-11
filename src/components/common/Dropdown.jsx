import { useEffect, useRef, useState } from 'react'

export default function Dropdown({ children, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const dropdownRef = useRef(null)

  const handleClick = (event) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (event, option) => {
    event.stopPropagation()
    setSelectedOption(option)
    setIsOpen(false)
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
            options.map(option => (
              <li
                className='px-4 py-2 hover:text-[#FF8906] cursor-pointer whitespace-nowrap'
                key={option}
                onClick={(event) => handleOptionClick(event, option)}
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