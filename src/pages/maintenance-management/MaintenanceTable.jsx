import { useEffect, useState } from 'react'
import Chip from '../../components/common/Chip'
import { defaultWorkOrderData } from '../../utils/objects/workOrder'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userAtom'

export default function MaintenanceTable({ workOrders = [], openReportForm }) {
  const user = useRecoilValue(userState)

  const isTechnical = user.roles.some(role => role === 'Técnico de Mantenimiento')

  const [dataWorkOrders, setDataWorkOrders] = useState([defaultWorkOrderData])
  useEffect(() => {
    const transformedWorkOrders = workOrders.map(workOrder => ({
      ...workOrder,
      status:
        <Chip
          variant={
            workOrder.status === 'Pendiente' ? 'yellow' :
              workOrder.status === 'En proceso' ? 'green' :
                workOrder.status === 'Urgente' ? 'red' : 'grey'
          }
        >
          {workOrder.status}
        </Chip>
    }))
    setDataWorkOrders(transformedWorkOrders)
  }, [workOrders])

  const handleOpenReportForm = (item = null) => {
    openReportForm(item)
  }

  const colums = [
    { title: 'Tipo de mantenimiento', value: 'type' },
    { title: 'Fecha programada', value: 'date' },
    { title: 'Estado', value: 'status' }
  ]

  return (
    <div>
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
                onClick={() => handleOpenReportForm(item)}
              >
                {
                  colums.map(column => (
                    <td
                      className={`px-6 py-4 ${isTechnical ? user.id === item.userId ? 'text-black' : 'text-gray-400' : 'text-black'}`}
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
    </div>
  )
}