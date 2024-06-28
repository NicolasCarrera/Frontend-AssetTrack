export default function ToolTip({ children, tooltip }) {
  return (
    <div className='group flex items-center'>
      {children}
      <div className='relative'>
        <span className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[#0F0E17] text-[#FFFFFE] px-3 py-2 rounded z-10 whitespace-nowrap absolute -translate-y-1/2 left-6'>
          {tooltip}
        </span>
      </div>
    </div>
  )
}