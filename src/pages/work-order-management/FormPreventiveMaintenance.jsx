import { useEffect, useState } from "react";
import { defaultPreventiveReportData } from "../../utils/objects/preventiveReport";
import { getUserById } from "../../services/user-role-management-service/users";

export default function FormPreventiveMaintenance({ onSubmit, workOrder = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultPreventiveReportData)

  useEffect(() => {
    const fetchTechnicianData = async () => {
      if (workOrder) {
        const technicianData = await getUserById(workOrder.userId)
        setFormData({ ...defaultPreventiveReportData, workDescription: workOrder.tasks.join(', '), technician: `${technicianData.firstName} ${technicianData.lastName}` });
      } else {
        setFormData(defaultPreventiveReportData);
      }
    }
    fetchTechnicianData()
  }, [workOrder])

  const handleSubmit = (e) => {
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
      <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4'>
        <legend className='font-bold mb-2'>Reporte preventivo</legend>
        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Nombre del técnico encargado</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={formData.technician}
            onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha del inicio del mantenimiento</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='date'
            value={formData.repairStartDate}
            onChange={(e) => setFormData({ ...formData, repairStartDate: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha de finalización del mantenimiento</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='date'
            value={formData.repairEndDate}
            onChange={(e) => setFormData({ ...formData, repairEndDate: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </label>

        <label className='block col-span-1 md:col-span-2'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Descripción del trabajo realizado</span>
          <textarea
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            value={formData.workDescription}
            onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
            readOnly={!isEditable}
            required
          />
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