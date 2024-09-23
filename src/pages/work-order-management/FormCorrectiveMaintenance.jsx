import { useEffect, useState } from "react";
import { defaultCorrectiveReportData } from "../../utils/objects/correctiveReport";
import { getUserById } from "../../services/user-role-management-service/users";

export default function FormCorrectiveMaintenance({ onSubmit, workOrder = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultCorrectiveReportData)

  useEffect(() => {
    const fetchTechnicianData = async () => {
      if (workOrder) {
        const technicianData = await getUserById(workOrder.userId)
        setFormData({ ...defaultCorrectiveReportData, workDescription: workOrder.tasks.join(', '), technician: `${technicianData.firstName} ${technicianData.lastName}` });
      } else {
        setFormData(defaultCorrectiveReportData);
      }
    }
    fetchTechnicianData()
  }, [workOrder]);

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
        <legend className='font-bold mb-2'>Reporte Correctivo</legend>
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
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha del incidente</span>
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='date'
            value={formData.incidentDate}
            onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
            readOnly={!isEditable}
            required
          />
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

        <label className='block'>
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha del inicio de la reparación</span>
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
          <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Fecha de finalización de la reparación</span>
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
      </fieldset>

      <label className='block col-span-1 md:col-span-2'>
        <span className='block mb-2 text-sm font-medium text-[#FFFFFE]'>Recomendaciones</span>
        <textarea
          className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
          value={formData.recommendations}
          onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
          readOnly={!isEditable}
        />
      </label>
      <button
        className='block max-w-80 w-full mx-auto my-16 px-4 py-2 rounded-md bg-[#FF8906]'
        type='submit'>
        Guardar
      </button>
    </form>
  )
}