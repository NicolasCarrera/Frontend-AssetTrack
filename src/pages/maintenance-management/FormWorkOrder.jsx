import { useEffect, useState } from "react"
import { defaultWorkOrderData } from "../../utils/objects/workOrder"

export default function FormWorkOrder({ onSubmit, initialData = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultWorkOrderData)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData(defaultWorkOrderData)
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit(formData)
  }
  return (
    <form
      className='h-full overflow-y-auto text-[#FFFFFE]'
      onSubmit={handleSubmit}
    >
      <input
        type='hidden'
        value={formData.id}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      />
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
        <legend className='font-bold mb-2'>Mantenimiento</legend>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Tipo de mantenimiento</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.type || ''}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            readOnly={!isEditable}
            required
          >
            <option value=''>Seleccione un tipo de mantenimiento</option>
            <option value='PREVENTIVE'>Mantenimiento preventivo</option>
            <option value='CORRECTIVE'>Mantenimiento correctivo </option>
          </select>
        </label>
        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha programada </span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='date'
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>
      </fieldset>
      <button
        className='block max-w-80 w-full mx-auto my-16 px-4 py-2 rounded-md bg-[#FF8906]'
        type='submit'>
        Guardar
      </button>
    </form>
  )
}