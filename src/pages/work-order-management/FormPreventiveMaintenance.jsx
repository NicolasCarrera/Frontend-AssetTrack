import { useEffect, useState } from "react";
import { defaultPreventiveReportData } from "../../utils/objects/preventiveReport";
import { getUserById } from "../../services/user-role-management-service/users";

export default function FormPreventiveMaintenance({ onSubmit, workOrder = null }) {
  const isEditable = true

  const [formData, setFormData] = useState({
    date: '',
    frequency: '',
    observations: '',
    recommendations: '',
    inspectedParts: '',
    replacedParts: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form
      className='h-full overflow-y-auto text-[#FFFFFE]'
      onSubmit={handleSubmit}
    >
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4'>
        <legend className='font-bold mb-2'>Reporte preventivo</legend>

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha del mantenimiento</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='date'
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Frecuencia de mantenimiento</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            readOnly={!isEditable}
            required
          >
            <option value=''>Seleccione la frecuencia</option>
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Partes inspeccionadas</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.inspectedParts}
            onChange={(e) => setFormData({ ...formData, inspectedParts: e.target.value })}
            readOnly={!isEditable}
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Partes remplazadas</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.replacedParts}
            onChange={(e) => setFormData({ ...formData, replacedParts: e.target.value })}
            readOnly={!isEditable}
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Observaciones</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.observations}
            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
            readOnly={!isEditable}
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Recomendaciones</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.recommendations}
            onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
            readOnly={!isEditable}
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