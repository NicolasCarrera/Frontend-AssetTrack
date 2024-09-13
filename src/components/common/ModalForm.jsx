import { useState } from 'react'
import Close from '../../assets/icons/Close'
import Eye from '../../assets/icons/Eye'
import Pencil from '../../assets/icons/Pencil'

export default function ModalForm({ isOpen, onClose, children, editingItem = null, editingMethod = () => { } }) {
  const enableEditButton = editingItem
  const [isEditable, setIsEditable] = useState(enableEditButton)
  const handleEditButton = () => {
    setIsEditable(!isEditable)
    editingMethod()
  }
  if (!isOpen) return null
  return (
    <div className='w-full h-screen fixed top-0 left-0 inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='max-w-[50rem] h-5/6 relative mx-10 bg-[#0F0E17] text-[#FFFFFE] px-10 md:px-16 pt-10 pb-20 box-border rounded-md shadow-lg'>
        <div className='flex justify-between gap-10'>
          <button
            className={`flex gap-4 items-center px-4 py-2 rounded-full bg-[#FF8906] text-[#FFFFFE] max-w-80 ${enableEditButton ? 'visible' : 'invisible'}`}
            onClick={handleEditButton}
          >
            {
              isEditable ? (
                <>
                  <Eye />
                  <span className='hidden md:inline-block'>Ver</span>
                </>
              ) : (
                <>
                  <Pencil />
                  <span className='hidden md:inline-block'>Editar</span>
                </>
              )
            }
          </button>
          <button onClick={onClose}>
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}