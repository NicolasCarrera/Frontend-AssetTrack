import { useEffect, useState } from 'react'
import Search from '../../components/common/Search'
import SearchTechnician from './SearchTechnician'

export default function ManageWorkOrder() {
  const colums = [
    { title: 'Tipo de mantenimiento', value: 'type' },
    { title: 'Fecha programada', value: 'date' },
    { title: 'Empresa', value: 'company' },
    { title: 'Sucursal', value: 'branch' },
    { title: 'Activo', value: 'asset' },
    { title: 'Técnico', value: 'technician' }
  ]
  const workOrders = [
    { id: 1, type: 'Preventivo', date: '16/07/2024', company: 'Compania A', branch: 'Sucursal A', asset: 'Activo A', technician: '' },
    { id: 2, type: 'Preventivo', date: '16/07/2024', company: 'Compania B', branch: 'Sucursal B', asset: 'Activo B', technician: '' },
    { id: 3, type: 'Preventivo', date: '16/07/2024', company: 'Compania C', branch: 'Sucursal C', asset: 'Activo C', technician: '' },
    { id: 4, type: 'Preventivo', date: '16/07/2024', company: 'Compania D', branch: 'Sucursal D', asset: 'Activo D', technician: '' },
    { id: 5, type: 'Preventivo', date: '16/07/2024', company: 'Compania E', branch: 'Sucursal E', asset: 'Activo E', technician: '' },
    { id: 6, type: 'Preventivo', date: '16/07/2024', company: 'Compania F', branch: 'Sucursal F', asset: 'Activo F', technician: '' }
  ]

  const [dataWorkOrders, setDataWorkOrders] = useState(workOrders)
  const [isOpenSearchTechnican, setIsOpenSearchTechnican] = useState(false)

  const toggleSearchTechnician = () => {
    setIsOpenSearchTechnican(!isOpenSearchTechnican)
  }

  useEffect(() => {
    const newDataWorkOrders = dataWorkOrders.map(workOrder => ({
      ...workOrder,
      technician: <button onClick={() => setIsOpenSearchTechnican(true)}>{workOrder.technician ? workOrder.technician : <span className='text-sm underline text-sky-500 hover:text-sky-800'>Asignar técnico</span>}</button>
    }))
    setDataWorkOrders(newDataWorkOrders)
  }, [])

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Ordenes de trabajo
      </h1>
      <div className='mb-5'>
        <Search />
      </div>
      <table className='w-full'>
        <thead className='bg-[#0F0E17] text-[#FFFFFE]'>
          <tr>
            {
              colums.map(column => (
                <th
                  className='py-4'
                  key={column.value}
                >
                  {column.title}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            dataWorkOrders.map(item => (
              <tr
                className='border-b border-gray-400 hover:bg-gray-100'
                key={item.id}
              >
                {
                  colums.map(column => (
                    <td
                      className='px-6 py-4'
                      key={column.value}
                    >
                      {item[column.value]}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      <SearchTechnician isOpen={isOpenSearchTechnican} onClose={toggleSearchTechnician} />
    </>
  )
}