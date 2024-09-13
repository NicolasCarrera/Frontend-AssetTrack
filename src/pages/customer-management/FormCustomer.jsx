import { useEffect, useState } from 'react'
import { defaultCompanyData } from '../../utils/objects/company';

export default function FormCustomer({ onSubmit, initialData = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultCompanyData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultCompanyData);
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
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Sector industrial</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            readOnly={!isEditable}
          />
        </label>
      </fieldset>
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4'>
        <legend className='font-bold mb-2'>Información de la sede o casa matriz</legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Dirección *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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