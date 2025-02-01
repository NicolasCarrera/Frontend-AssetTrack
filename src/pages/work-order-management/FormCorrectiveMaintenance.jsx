import { useEffect, useState } from "react";
import { defaultCorrectiveReportData } from "../../utils/objects/correctiveReport";
import { getUserById } from "../../services/user-role-management-service/users";

export default function FormCorrectiveMaintenance({ onSubmit, workOrder = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultCorrectiveReportData)

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
        <legend className='font-bold mb-2'>Reporte Correctivo</legend>

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
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Estado de Mantenimiento</span>
          <select
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.postMaintenanceStatus}
            onChange={(e) => setFormData({ ...formData, postMaintenanceStatus: e.target.value })}
            readOnly={!isEditable}
            required
          >
            <option value=''>Seleccione un estado</option>
            <option value="en mantenimiento">En mantenimiento</option>
            <option value="en funcionamiento">En funcionamiento</option>
            <option value="pendiente de repuestos">Pendiente de repuestos</option>
            <option value="fuera de servicio">Fuera de servicio</option>
            <option value="funcionando parcialmente">Funcionando parcialmente</option>
          </select>
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Descripción del problema</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.problemDescription}
            onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Análisis del problema</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.problemAnalysis}
            onChange={(e) => setFormData({ ...formData, problemAnalysis: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Motivo del problema</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.rootCause}
            onChange={(e) => setFormData({ ...formData, rootCause: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Partes dañadas</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.damagedParts}
            onChange={(e) => setFormData({ ...formData, damagedParts: e.target.value })}
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