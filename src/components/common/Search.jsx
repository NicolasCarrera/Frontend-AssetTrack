import MagnifyingGlass from '../../assets/icons/MagnifyingGlass'

export default function Search() {
  return (
    <form className='flex border bg-[#FFFFFE] border-[#0F0E17] rounded-full text-[#0F0E17] max-w-80'>
      <input
        type='text'
        placeholder='Buscar'
        className='flex-grow px-4 py-2 outline-none rounded-full'
      />
      <button
        type='submit'
        className='px-4 py-2'
      >
        <MagnifyingGlass />
      </button>
    </form>
  )
}