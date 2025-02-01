import { useEffect, useState } from "react";
import { defaultBranchData } from "../../utils/objects/branch";

export default function FormBranch({ onSubmit, initialData = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultBranchData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultBranchData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
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
        <legend className='font-bold mb-2'>Datos de la sucursal </legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Nombre *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Dirección *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })} // TODO: Cambiar addres por location
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Teléfono *</span>
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
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Email *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            readOnly={!isEditable}
            required
          />
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