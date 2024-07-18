import { useEffect, useState } from "react"
import Close from "../../assets/icons/Close"
import Information from "../../assets/icons/Information"

export default function Alert({ title, message }) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (title) {
      setIsOpen(true)
    }
  }, [title, message])
  if (!isOpen) return null
  return (
    <div className="fixed bottom-0 right-0 m-6 bg-[#0F0E17] text-[#FFFFFE] p-4 rounded-lg shadow-lg">
      <header className="flex gap-4 justify-between items-center mb-2">
        <h2 className="flex gap-2 font-bold">
          <Information />
          {title}
        </h2>
        <button onClick={() => setIsOpen(false)}>
          <Close />
        </button>
      </header>
      <ul className="list-disc pl-12 text-sm mr-8">
        {message.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}