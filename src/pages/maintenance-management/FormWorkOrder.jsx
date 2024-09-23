import { useEffect, useState } from "react"
import { defaultWorkOrderData } from "../../utils/objects/workOrder"
import Close from "../../assets/icons/Close"

export default function FormWorkOrder({ onSubmit, initialData = null }) {
  const isEditable = true

  const [formData, setFormData] = useState(defaultWorkOrderData)
  const [input, setInput] = useState('')

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

  const addTask = (e) => {
    e.preventDefault()
    if (input.trim() !== '') {
      setFormData({ ...formData, tasks: [...formData.tasks, input.trim()] })
      setInput('');
    }
  }

  const removeTask = (index) => {
    const newTasks = formData.tasks.filter((_, i) => i !== index)
    setFormData({ ...formData, tasks: newTasks })
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
            <option value='PREVENTIVO'>Mantenimiento preventivo</option>
            <option value='CORRECTIVO'>Mantenimiento correctivo </option>
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
      <fieldset className='my-4'>
        <legend className='font-bold mb-2'>Lista de tareas</legend>
        <div className="flex items-center justify-between gap-4">
          <input
            className='block w-full px-4 py-2 rounded-md text-[#0F0E17]'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            readOnly={!isEditable}
          />
          <button
            className='block px-4 py-2 rounded-md whitespace-nowrap bg-[#FF8906]'
            onClick={addTask}
          >
            Agregar tarea
          </button>
        </div>
        <ul>
          {
            formData.tasks.map((task, index) => (
              <li
                className="flex items-center justify-between px-4 py-2 hover:text-[#FF8906]"
                key={index}
              >
                <span>{task}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => removeTask(index)}
                >
                  <Close />
                </span>
              </li>
            ))
          }
        </ul>
      </fieldset>
      <button
        className='block max-w-80 w-full mx-auto my-16 px-4 py-2 rounded-md bg-[#FF8906]'
        type='submit'>
        Guardar
      </button>
    </form>
  )
}