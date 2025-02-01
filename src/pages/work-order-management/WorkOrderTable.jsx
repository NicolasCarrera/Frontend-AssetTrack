import { useEffect, useState } from "react"
import { getUserById } from "../../services/user-role-management-service/users"
import { getAssetById } from "../../services/customer-assets-service/asset"
import { getBranchById } from "../../services/customer-branches-service/branch"
import { getCustomerById } from "../../services/customer-branches-service/customer"
import { useRecoilValue } from "recoil"
import { userState } from "../../state/userAtom"

export default function WorkOrderTable({ workOrders = [], openSearchTechnican, openReportForm }) {
  const user = useRecoilValue(userState)

  const isAdmin = user.roles.name === 'Gerente de Mantenimiento'

  const [dataWorkOrder, setDataWorkOrder] = useState([])

  useEffect(() => {
    const refactorData = async () => {
      const refactorDataWorkOrder = await Promise.all(workOrders.map(async (workOrder) => {
        const userData = await getUserById(workOrder.userId)
        const assetData = await getAssetById(workOrder.assetId)
        const branchData = await getBranchById(workOrder.branchId)
        const clientData = await getCustomerById(workOrder.companyId)

        return {
          ...workOrder,
          company: clientData?.name,
          branch: branchData?.name,
          asset: assetData?.name,
          type: workOrder.type === 'PREVENTIVE' ? 'Mantenimiento preventivo' : 'Mantenimiento correctivo',
          technician:
            isAdmin ?
              <button onClick={(e) => handleOpenSearchTechnican(e, workOrder)}>
                <span className='text-sm underline text-sky-500 hover:text-sky-800'>{workOrder.userId ? `${userData.firstName} ${userData.lastName}` : 'Asignar técnico'}</span>
              </button>
              :
              <span>{`${userData.firstName} ${userData.lastName}`}</span>
        }
      }))
      setDataWorkOrder(refactorDataWorkOrder)
    }
    refactorData()
  }, [workOrders])

  const handleOpenSearchTechnican = (e, item = null) => {
    e.stopPropagation()
    openSearchTechnican(item)
  }

  const handleOpenReportForm = (item = null) => {
    openReportForm(item)
  }

  const colums = [
    { title: 'Tipo de mantenimiento', value: 'type' },
    { title: 'Fecha programada', value: 'date' },
    { title: 'Empresa', value: 'company' },
    { title: 'Sucursal', value: 'branch' },
    { title: 'Activo', value: 'asset' },
    { title: 'Técnico', value: 'technician' }
  ]

  return (
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
          dataWorkOrder.map(item => (
            <tr
              className='border-b border-gray-400 hover:bg-gray-100'
              key={item.id}
              onClick={() => handleOpenReportForm(item)}
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
  )
}