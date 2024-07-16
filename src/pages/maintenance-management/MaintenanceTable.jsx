import Chip from "../../components/common/Chip"

export default function MaintenanceTable() {
  const colums = [
    { title: 'Tipo de mantenimiento', value: 'type' },
    { title: 'Fecha programada', value: 'date' },
    { title: 'Estado', value: 'status' }
  ]
  const maintenance = [
    { id: 1, type: 'Preventivo', date: '12/07/2024', status: <Chip variant='yellow'>Pendiente</Chip> },
    { id: 2, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 3, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 4, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 5, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 6, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 7, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 8, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
    { id: 9, type: 'Preventivo', date: '12/07/2024', status: 'Pendiente' },
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
            maintenance.map(item => (
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
    </div>
  )
}