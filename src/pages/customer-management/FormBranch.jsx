import { useState } from 'react'
import Eye from '../../assets/icons/Eye'
import Pencil from '../../assets/icons/Pencil'
import Close from '../../assets/icons/Close'

export default function FormBranch({ isOpen, onClose, data }) {
  const thereIsData = Boolean(data)
  const [isEditable, setIsEditable] = useState(!thereIsData)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const { id, name, address, phonenumber, email } = event.target.elements
    const branchData = {
      id: id.value,
      nombre: name.value,
      direccion: address.value,
      telefono: phonenumber.value,
      email: email.value,
      numeroActivos: 0,
      empresaId: data // TODO: pasar la id de la empresa al momento de añadir la sucursal
    }
    try {
      console.log('Sucursal registrada', branchData)
    } catch (error) {
      console.error('Error el registrar la sucursal', error)
    }
    onClose()
  }

  if (!isOpen) return null
  return (
    <div className='w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-black/50'>
      <div className='w-11/12 md:w-3/4 h-5/6 box-border rounded-md shadow-lg bg-[#0F0E17] text-[#FFFFFE] px-10 pt-10 pb-20'>
        <div className='flex justify-between'>
          <button
            className={`flex gap-4 items-center px-4 py-2 rounded-full bg-[#FF8906] text-[#FFFFFE] max-w-80 ${thereIsData ? 'visible' : 'invisible'}`}
            onClick={() => setIsEditable(!isEditable)}
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
        <form
          className='h-full overflow-y-auto'
          onSubmit={handleSubmit}
        >
          <input type='hidden' name='id' defaultValue={data} />
          <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4'>
            <legend className='font-bold mb-2'>Datos de la sucursal </legend>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Nombre *</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='name'
                defaultValue={data}
                readOnly={!isEditable}
                required
              />
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Dirección *</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='address'
                defaultValue={data}
                readOnly={!isEditable}
                required
              />
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Teléfono *</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='phonenumber'
                defaultValue={data}
                readOnly={!isEditable}
                required
              />
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Email *</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='email'
                name='email'
                defaultValue={data}
                readOnly={!isEditable}
                required
              />
            </label>
          </fieldset>
          <button
            className='block max-w-80 w-full mx-auto my-16 px-4 py-2 rounded-md bg-[#FF8906]'
            type='submit'>
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  )
}