import { useEffect, useState } from 'react'
import SearchTechnician from './SearchTechnician'
import { defaultWorkOrderData } from '../../utils/objects/workOrder'
import { deleteWorkOrder, getAllWorkOrders, updateWorkOrder } from '../../services/work-order-maintenance-service/workOrders'
import ModalForm from '../../components/common/ModalForm'
import WorkOrderTable from './WorkOrderTable'
import FormPreventiveMaintenance from './FormPreventiveMaintenance'
import FormCorrectiveMaintenance from './FormCorrectiveMaintenance'
import { cleateReport } from '../../services/work-order-maintenance-service/reports'
import { defaultReportData } from '../../utils/objects/report'
import { cleatePreventiveReport } from '../../services/work-order-maintenance-service/preventiveReport'
import { getAssetById, updateAsset } from '../../services/customer-assets-service/asset'
import { cleateCorrectiveReport } from '../../services/work-order-maintenance-service/correctiveReport'
import { useNavigate } from 'react-router-dom'

export default function ManageWorkOrder() {
  const navigate = useNavigate()

  const [dataWorkOrders, setDataWorkOrders] = useState([defaultWorkOrderData])

  const [isOpenSearchTechnican, setIsOpenSearchTechnican] = useState(false)
  const [isOpenPreventiveReportForm, setIsOpenPreventiveReportForm] = useState(false)
  const [isOpenCorrectiveReportForm, setIsOpenCorrectiveReportForm] = useState(false)

  const [editingWorkOrder, setEditingWorkOrder] = useState(null)

  useEffect(() => {
    const fetchWorkOrdersData = async () => {
      const workOrders = await getAllWorkOrders()
      setDataWorkOrders(workOrders)
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
    console.log(item);
    navigate(`/customers/${item.companyId}/branches/${item.branchId}/asset/${item.assetId}`)
    // const workOrder = dataWorkOrders.find(wo => wo.id === item.id ? wo : null)
    // setEditingWorkOrder(workOrder)
    // if (workOrder.type === 'PREVENTIVO') {
    //   setEditingWorkOrder(workOrder)
    //   setIsOpenPreventiveReportForm(true)
    // } else if (workOrder.type === 'CORRECTIVO') {
    //   setEditingWorkOrder(workOrder)
    //   setIsOpenCorrectiveReportForm(true)
    // }
  }

  const handleCloseSearchTechnican = () => {
    setIsOpenSearchTechnican(false)
    setEditingWorkOrder(null)
  }

  const handleCloseReportForm = () => {
    setIsOpenPreventiveReportForm(false)
    setIsOpenCorrectiveReportForm(false)
  }

  const handleSubmitReport = async (workOrder) => {
    const { type, date, userId, assetId } = workOrder
    const report = {
      ...defaultReportData,
      type: type,
      date: date,
      userId: userId,
      assetId: assetId
    }
    const newReport = await cleateReport(report)
    return newReport
  }

  const handleSubmitPreventiveReport = async (formData) => {
    const newReport = await handleSubmitReport(editingWorkOrder)
    await cleatePreventiveReport({ ...formData, reportId: newReport.id })
    await handleDeleteUser(editingWorkOrder.id)
    setDataWorkOrders(...dataWorkOrders)
    const asset = await getAssetById(editingWorkOrder.assetId)
    await updateAsset(editingWorkOrder.assetId, { ...asset, maintenance: { ...asset.maintenance, last: newReport.date } })
    handleCloseReportForm()
  }

  const handleSubmitCorrectiveReport = async (formData) => {
    const newReport = await handleSubmitReport(editingWorkOrder)
    await cleateCorrectiveReport({ ...formData, reportId: newReport.id })
    await handleDeleteUser(editingWorkOrder.id)
    const asset = await getAssetById(editingWorkOrder.assetId)
    await updateAsset(editingWorkOrder.assetId, { ...asset, maintenance: { ...asset.maintenance, last: newReport.date } })
    handleCloseReportForm()
  }

  const handleDeleteUser = async (id) => {
    await deleteWorkOrder(id)
    setDataWorkOrders(dataWorkOrders.filter(workOrder => workOrder.id != id))
  }

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Órdenes de trabajo
      </h1>
      <WorkOrderTable workOrders={dataWorkOrders} openSearchTechnican={handleOpenSearchTechnican} openReportForm={handleOpenReportForm} />

      <SearchTechnician isOpen={isOpenSearchTechnican} onClose={handleCloseSearchTechnican} onClick={handleSelectTechnician} />
      <ModalForm isOpen={isOpenCorrectiveReportForm} onClose={handleCloseReportForm} >
        <FormCorrectiveMaintenance onSubmit={handleSubmitCorrectiveReport} workOrder={editingWorkOrder} />
      </ModalForm >
      <ModalForm isOpen={isOpenPreventiveReportForm} onClose={handleCloseReportForm} >
        <FormPreventiveMaintenance onSubmit={handleSubmitPreventiveReport} workOrder={editingWorkOrder} />
      </ModalForm >
    </>
  )
}