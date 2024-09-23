export default function Button({ icon, children, onClick }) {
  const handleClick = (event) => {
    event.stopPropagation()
    onClick?.(event)
  }
  return (
    <button
      className='flex gap-4 items-center px-4 py-2 rounded-full bg-[#FF8906] text-[#FFFFFE] max-w-80 h-fit'
      onClick={handleClick}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}