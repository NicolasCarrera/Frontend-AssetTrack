import { useEffect, useState } from 'react'
import { defaultCompanyData } from '../../utils/objects/company';
import { getUserByRole } from '../../services/user-role-management-service/users';

export default function FormCustomer({ onSubmit, initialData = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultCompanyData)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData(defaultCompanyData)
    }
    getAllUsers()
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const getAllUsers = async () => {
    const response = await getUserByRole('Usuario')
    setUsers(response)
  }

  return (
    <form
      className='h-full overflow-y-auto'
      onSubmit={handleSubmit}
    >
      <input
        type='hidden'
        value={formData.id}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      />
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4'>
        <legend className='font-bold mb-2'>Datos de la empresa</legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Nombre de la empresa *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            name='name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Gerente *</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            readOnly={!isEditable}
            required
          >
            <option value={null}>Usuario encargado</option>
            {
              users.length > 0 &&
              users.map(user => (
                <option key={user.id} value={user.id}>{user.firstName}</option>
              ))
            }
          </select>
        </label>

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Estado</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            readOnly={!isEditable}
            required
          >
            <option value=''>Seleccione el estado</option>
            <option value='ACTIVE'>Activo</option>
            <option value='INACTIVE'>Inactivo</option>
          </select>
        </label>
      </fieldset>
      <button
        className='block max-w-80 w-full mx-auto my-16 px-4 py-2 rounded-md bg-[#FF8906]'
        type='submit'>
        {
          initialData ? 'Guardar cambios' : 'Guardar'
        }
      </button>
    </form>
  )
}