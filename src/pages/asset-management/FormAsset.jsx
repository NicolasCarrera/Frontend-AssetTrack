import { useEffect, useState } from "react";
import { defaultAssetData } from "../../utils/objects/asset";

export default function FormAsset({ onSubmit, initialData = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultAssetData)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultAssetData);
    }
  }, [initialData])

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
        <legend className='font-bold mb-2'>Datos del activo</legend>
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
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Numero de serie *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.serial}
            onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Marca*</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Modelo *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Localización *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha de adquisición *</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='date'
            value={formData.acquisition}
            onChange={(e) => setFormData({ ...formData, acquisition: e.target.value })}
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
        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Descripción</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            readOnly={!isEditable}
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