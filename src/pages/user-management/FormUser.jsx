import { useEffect, useState } from 'react'
import { defaultUserData } from '../../utils/objects/user'

export default function FormUser({ onSubmit, initialData = null }) {
  const isEditable = true

  const [documentTypes, setDocumentTypes] = useState([])
  const [availableRoles, setAvailableRoles] = useState([])

  const [formData, setFormData] = useState(defaultUserData)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData(defaultUserData)
    }
    setDocumentTypes([
      {
        id: 1,
        type: 'Cédula de identidad',
        value: 'IDENTITY_CARD'
      },
      {
        id: 2,
        type: 'Pasaporte',
        value: 'PASSPORT'
      },
      {
        id: 3,
        type: 'Otro',
        value: 'OTHER'
      }
    ])
    setAvailableRoles([
      {
        id: 1,
        name: 'Gerente de Mantenimiento'
      },
      {
        id: 2,
        name: 'Técnico de Mantenimiento'
      },
      {
        id: 3,
        name: 'Usuario'
      }
    ])
  }, [initialData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { id, firstName, lastName, email, password, phone, documents, roles, status } = formData;

    const cleanData = {
      id,
      firstName,
      lastName,
      email,
      password,
      phone,
      document: {
        document: documents.document,
        identification: documents.identification
      },
      role: roles.name,
      status,
    };
    await onSubmit(cleanData)
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
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
        <legend className='font-bold mb-2'>Datos Personales</legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Nombres</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Apellidos</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Número de teléfono</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Email</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        {
          !formData.id &&
          <label className='block'>
            <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Contraseña</span>
            <input
              className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
              type='password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              readOnly={!isEditable}
              required
            />
          </label>
        }

      </fieldset>
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
        <legend className='font-bold mb-2'>Identificación</legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Tipo de identificación</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.documents?.document}
            onChange={(e) => setFormData({ ...formData, documents: { ...formData.documents, document: e.target.value } })}
            readOnly={!isEditable}
            required
          >
            <option value=''>Seleccione una identificación</option>
            {
              documentTypes.map(type => (
                <option
                  key={type.id}
                  value={type.value}
                >
                  {
                    type.type
                  }
                </option>
              ))
            }
          </select>
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Identidicación</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.documents?.identification}
            onChange={(e) => setFormData({ ...formData, documents: { ...formData.documents, identification: e.target.value } })}
            readOnly={!isEditable}
            required
          />
        </label>
      </fieldset>
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
        <legend className='font-bold mb-2'>Permisos y estados</legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Roles</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.roles && formData.roles.name}
            onChange={(e) => setFormData({ ...formData, roles: { ...formData.roles, name: e.target.value } })}
            readOnly={!isEditable}
            required
          >
            <option value=''>Seleccione un rol</option>
            {
              availableRoles.map(role => (
                <option
                  key={role.id}
                  value={role.name}
                >
                  {
                    role.name
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
