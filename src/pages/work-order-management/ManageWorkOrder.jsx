import { useEffect, useState } from 'react'
import Search from '../../components/common/Search'
import SearchTechnician from './SearchTechnician'
import { defaultWorkOrderData } from '../../utils/objects/workOrder'
import { getAllWorkOrders, updateWorkOrder } from '../../services/work-order-maintenance-service/workOrders'
import { getAssetById } from '../../services/customer-assets-service/asset'
import { getBranchById } from '../../services/customer-branches-service/branch'
import { getCustomerById } from '../../services/customer-branches-service/customer'
import { getUserById } from '../../services/user-role-management-service/users'

export default function ManageWorkOrder() {
  const [dataWorkOrders, setDataWorkOrders] = useState([defaultWorkOrderData])
  const [isOpenSearchTechnican, setIsOpenSearchTechnican] = useState(false)
  const [editingWorkOrder, setEditingWorkOrder] = useState(null)

  useEffect(() => {
    const fetchWorkOrdersData = async () => {
      const workOrders = await getAllWorkOrders()

      const updatedData = await Promise.all(workOrders.map(async (workOrder) => {
        const userData = await getUserById(workOrder.userId)
        const assetData = await getAssetById(workOrder.assetId)
        const branchData = await getBranchById(assetData.branchId)
        const clientData = await getCustomerById(branchData.companyId)

        return {
          ...workOrder,
          company: clientData?.name,
          branch: branchData?.name,
          asset: assetData.name,
          technician:
            <button onClick={() => handleOpenSearchTechnican(workOrder)}>
              <span className='text-sm underline text-sky-500 hover:text-sky-800'>{workOrder.userId ? `${userData.firstName} ${userData.lastName}` : 'Asignar técnico'}</span>
            </button>
        }
      }))

      setDataWorkOrders(updatedData)
    }
    fetchWorkOrdersData()
  }, [])

  const handleSelectTechnician = async (technician) => {
    const updateWorkOrderData = dataWorkOrders.find(workOrder => workOrder.id === editingWorkOrder.id)
    await updateWorkOrder(editingWorkOrder.id, { ...editingWorkOrder, userId: technician.id })
    setDataWorkOrders(dataWorkOrders.map(workOrder => workOrder.id === editingWorkOrder.id ?
      {
        ...updateWorkOrderData,
        userId: technician.id,
        technician:
          <button onClick={() => handleOpenSearchTechnican(editingWorkOrder)}>
            <span className='text-sm underline text-sky-500 hover:text-sky-800'>{`${technician.firstName} ${technician.lastName}`}</span>
          </button>
      } : workOrder
    ))

    handleCloseSearchTechnican()
  }

  const handleOpenSearchTechnican = (item = null) => {
    setEditingWorkOrder(item)
    setIsOpenSearchTechnican(true)
  }

  const handleCloseSearchTechnican = () => {
    setIsOpenSearchTechnican(false)
    setEditingWorkOrder(null)
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
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Ordenes de trabajo
      </h1>
      {/* <div className='mb-5'>
        <Search />
      </div> */}
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
      <SearchTechnician isOpen={isOpenSearchTechnican} onClose={handleCloseSearchTechnican} onClick={handleSelectTechnician} />
    </>
  )
}