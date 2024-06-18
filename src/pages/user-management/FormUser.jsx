import { useEffect, useState } from 'react'
import Camera from '../../assets/icons/Camera'
import Close from '../../assets/icons/Close'
import Pencil from '../../assets/icons/Pencil'
import { signupUser, updateUser } from '../../services/user-role-management-service/users'
import { getAllRoles } from '../../services/user-role-management-service/roles'

export default function FormUser({ isOpen, onClose, data }) {


  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetchRoles = async () => {
      const newRoles = await getAllRoles()
      setRoles(newRoles)
    }
    fetchRoles()
  }, [])

  if (!isOpen) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = {
      id: event.target.elements.id.value,
      username: 'sistema 1', // eliminar
      password: '12345',
      names: event.target.elements.names.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      phoneNumber: event.target.elements.phoneNumber.value,
      identityDocuments: [
        {
          documentType: event.target.elements.documentType.value,
          identification: event.target.elements.identification.value
        }
      ],
      roles: [event.target.elements.role.value],
      status: event.target.elements.status.value
    }
    try {
      if (userData.id) {
        const response = await updateUser(userData.id, userData)
        console.log('Los datos del usuario se han actualizado:', response)
      } else {
        const response = await signupUser(userData)
        console.log('Usuario registrado exitosamente:', response)
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error.response?.data || error.message)
    }
  }

  return (
    <div className='w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-black/50'>
      <div className='w-11/12 md:w-3/4 h-5/6 relative bg-[#0F0E17] text-[#FFFFFE] px-10 md:px-16 pt-10 pb-20 box-border'>
        <div className='flex justify-between'>
          <button
            className='flex gap-4 items-center px-4 py-2 rounded-full bg-[#FF8906] text-[#FFFFFE] max-w-80'
            onClick={() => console.log('Aqui se avilitan todos los campos y se cambia el icono de editar el por el de ver')}
          >
            <Pencil />
            <span className='hidden md:inline-block'>Editar</span>
          </button>
          <button onClick={onClose}>
            <Close />
          </button>
        </div>
        <form
          className='h-full overflow-y-auto'
          onSubmit={handleSubmit}
        >
          <input type='hidden' name='id' defaultValue={data.id} />
          <div className='flex justify-center'>
            <label>
              {
                data.avatar ?
                  <img
                    className='size-40 aspect-square rounded-full cursor-pointer'
                    src={data.avatar}
                    alt='Avatar'
                  />
                  :
                  <div className='flex items-center justify-center size-40 rounded-full bg-[#FFFFFE] text-[#0F0E17] cursor-pointer'>
                    <Camera />
                  </div>
              }
              <input
                className='hidden'
                type='file'
                name='avatar'
              />
            </label>
          </div>

          <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
            <legend className='font-bold mb-2'>Datos Personales</legend>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Nombres</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='names'
                defaultValue={data.names}
              />
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Apellidos</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='lastName'
                defaultValue={data.lastName}
              />
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Número de teléfono</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='phoneNumber'
                defaultValue={data.phoneNumber}
              />
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Email</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='email'
                name='email'
                defaultValue={data.email}
              />
            </label>
          </fieldset>
          <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
            <legend className='font-bold mb-2'>Identificación</legend>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Tipo de identificación</span>
              <select
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                name='documentType'
                defaultValue={data.documents[0].type}
              >
                <option value='IDENTITY_CARD'>Cédula de identidad</option>
                <option value='PASSPORT'>Pasaporte</option>
                <option value='OTHER'>Otro</option>
              </select>
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Identidicación</span>
              <input
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                type='text'
                name='identification'
                defaultValue={data.documents[0].value}
              />
            </label>
          </fieldset>
          <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
            <legend className='font-bold mb-2'>Permisos y estados</legend>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Roles</span>
              <select
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                name='role'
              >
                {
                  roles.map(role => (
                    <option
                      key={role.id}
                      value={role.roleName}
                    >
                      {
                        role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1).toLowerCase()
                      }
                    </option>
                  ))
                }
              </select>
            </label>
            <label className='block'>
              <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Estado</span>
              <select
                className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
                name='status'
              >
                <option value='ACTIVE'>Activo</option>
                <option value='INACTIVE'>Inactivo</option>
              </select>
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
