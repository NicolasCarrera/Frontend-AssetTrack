export default function HistoryTable() {
  const colums = [
    { title: 'Tipo de mantenimiento', value: 'type' },
    { title: 'Fecha programada', value: 'date' },
    { title: 'Técnico', value: 'technician' }
  ]
  const history = [
    { id: 1, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 2, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 3, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 4, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 5, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 6, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 7, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 8, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
    { id: 9, type: 'Preventivo', date: '12/07/2024', technician: 'Don Segundo' },
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
            history.map(item => (
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