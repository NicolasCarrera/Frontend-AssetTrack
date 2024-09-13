import { useState } from 'react'
import MagnifyingGlass from '../../assets/icons/MagnifyingGlass'

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e) => {
    e.preventDefault()
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <form className='flex border bg-[#FFFFFE] border-[#0F0E17] rounded-full text-[#0F0E17] max-w-80'>
      <input
        type='text'
        placeholder='Buscar'
        className='flex-grow px-4 py-2 outline-none rounded-full'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <span className='px-4 py-2'>
        <MagnifyingGlass />
      </span>
    </form>
  )
}