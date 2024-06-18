export default function Chip({ variant, children }) {
  let chipClass = ''
  switch (variant) {
    case 'green':
      chipClass = 'bg-[#CCFFCC] text-[#00AA00]'
      break
    case 'yellow':
      chipClass = 'bg-[#FFFFD0] text-[#F5B100]'
      break
    case 'red':
      chipClass = 'bg-[#FFBBBB] text-[#FF0000]'
      break
    case 'grey':
      chipClass = 'bg-[#D4D4D4] text-[#303030]'
      break
    default:
      break
  }
  return (
    <div className={`w-auto max-w-24 px-2 py-1 rounded-full text-xs text-center ${chipClass}`}>
      {children}
    </div>
  )
}