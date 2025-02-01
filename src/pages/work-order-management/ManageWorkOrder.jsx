import { useEffect, useState } from 'react'
import SearchTechnician from './SearchTechnician'
import { defaultWorkOrderData } from '../../utils/objects/workOrder'
import { getAllWorkOrders, getWorkOrdersByUserId, updateWorkOrder } from '../../services/work-order-maintenance-service/workOrders'
import WorkOrderTable from './WorkOrderTable'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userAtom'

export default function ManageWorkOrder() {
  const navigate = useNavigate()

  const user = useRecoilValue(userState)

  const isTechnical = user.roles.name === 'Técnico de Mantenimiento'

  const [dataWorkOrders, setDataWorkOrders] = useState([defaultWorkOrderData])

  const [isOpenSearchTechnican, setIsOpenSearchTechnican] = useState(false)

  const [editingWorkOrder, setEditingWorkOrder] = useState(null)

  useEffect(() => {
    const fetchWorkOrdersData = async () => {
      if (isTechnical) {
        const workOrders = await getWorkOrdersByUserId(user.id)
        setDataWorkOrders(workOrders)
      } else {
        const workOrders = await getAllWorkOrders()
        setDataWorkOrders(workOrders)
      }
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

  const handleOpenReportForm = (item = null) => {
    navigate(`/customers/${item.companyId}/branches/${item.branchId}/asset/${item.assetId}`)
  }

  const handleCloseSearchTechnican = () => {
    setIsOpenSearchTechnican(false)
    setEditingWorkOrder(null)
  }

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Órdenes de trabajo
      </h1>
      <WorkOrderTable workOrders={dataWorkOrders} openSearchTechnican={handleOpenSearchTechnican} openReportForm={handleOpenReportForm} />

      <SearchTechnician isOpen={isOpenSearchTechnican} onClose={handleCloseSearchTechnican} onClick={handleSelectTechnician} />

    </>
  )
}