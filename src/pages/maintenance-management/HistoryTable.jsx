import { useEffect, useState } from 'react'
import { defaultReportData } from '../../utils/objects/report'
import { getUserById } from '../../services/user-role-management-service/users'

export default function HistoryTable({ reports = [] }) {
  const [dataReports, setDataReports] = useState([defaultReportData])

  useEffect(() => {
    const fetchUserData = async () => {
      if (reports.length > 0) {
        const updatedData = await Promise.all(reports.map(async (report) => {
          if (report.userId) {
            const userData = await getUserById(report.userId)
            return {
              ...report,
              technician: userData.firstName,
            }
          }
          return { ...report, technician: '' }
        }))
        setDataReports(updatedData)
      }
    }
    fetchUserData()
  }, [reports])

  const colums = [
    { title: 'Tipo de mantenimiento', value: 'type' },
    { title: 'Fecha programada', value: 'date' },
    { title: 'Técnico', value: 'technician' }
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
            dataReports.map(item => (
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