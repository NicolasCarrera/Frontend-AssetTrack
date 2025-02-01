import { useParams } from 'react-router-dom'
import TabsContainer from '../../components/tab/TabsContainer'
import MaintenanceTable from './MaintenanceTable'
import { useEffect, useState } from 'react'
import HistoryTable from './HistoryTable'
import { defaultCompanyData } from '../../utils/objects/company'
import { defaultBranchData } from '../../utils/objects/branch'
import { defaultAssetData } from '../../utils/objects/asset'
import { getCustomerById } from '../../services/customer-branches-service/customer'
import { getBranchById } from '../../services/customer-branches-service/branch'
import { getAssetById, updateAsset } from '../../services/customer-assets-service/asset'
import { defaultWorkOrderData } from '../../utils/objects/workOrder'
import { cleateWorkOrder, deleteWorkOrder, getWorkOrdersByAssetId, updateWorkOrder } from '../../services/work-order-maintenance-service/workOrders'
import { defaultReportData } from '../../utils/objects/report'
import { cleateReport, getReportsByAssetId } from '../../services/work-order-maintenance-service/reports'
import Button from '../../components/common/Button'
import PlusCircle from '../../assets/icons/PlusCircle'
import ModalForm from '../../components/common/ModalForm'
import FormWorkOrder from './FormWorkOrder'
import FormCorrectiveMaintenance from '../work-order-management/FormCorrectiveMaintenance'
import FormPreventiveMaintenance from '../work-order-management/FormPreventiveMaintenance'
import { userState } from '../../state/userAtom'
import { useRecoilValue } from 'recoil'
import Alert from '../../components/common/Alert'

export default function ManageMaintenance() {
  const { customerId, branchId, assetId } = useParams()

  const user = useRecoilValue(userState)

  const isAdmin = user.roles.name === 'Gerente de Mantenimiento'
  const isTechnical = user.roles.name === 'Técnico de Mantenimiento'

  const [dataCompany, setDataCompany] = useState(defaultCompanyData)
  const [dataBranch, setDataBranch] = useState(defaultBranchData)
  const [dataAsset, setDataAsset] = useState(defaultAssetData)
  const [dataWorkOrders, setDataWorkOrders] = useState([defaultWorkOrderData])
  const [dataReports, setDataReports] = useState([defaultReportData])

  const [isOpenWorkOrderForm, setIsOpenWorkOrderForm] = useState(false)
  const [isOpenPreventiveReportForm, setIsOpenPreventiveReportForm] = useState(false)
  const [isOpenCorrectiveReportForm, setIsOpenCorrectiveReportForm] = useState(false)

  const [editingWorkOrder, setEditingWorkOrder] = useState(null)

  const [alertModal, setAlertModal] = useState({ title: '', message: [] })

  useEffect(() => {
    const fetchData = async () => {
      const newDataCompany = await getCustomerById(customerId)
      setDataCompany(newDataCompany)
      const newDataBranch = await getBranchById(branchId)
      setDataBranch(newDataBranch)
      const newDataAsset = await getAssetById(assetId)
      setDataAsset(newDataAsset)
      const newDataWorkOrders = await getWorkOrdersByAssetId(assetId)
      setDataWorkOrders(newDataWorkOrders)
      const newDataReports = await getReportsByAssetId(assetId)
      setDataReports(newDataReports)
    }
    fetchData()
  }, [])

  const handleOpenOrderForm = (item = null) => {
    setEditingWorkOrder(item)
    setIsOpenWorkOrderForm(true)
  }

  const handleCloseOrderForm = () => {
    setIsOpenWorkOrderForm(false)
    setEditingWorkOrder(null)
  }

  const handleSubmitWorkOrder = async (formData) => {
    if (editingWorkOrder?.id) {
      const updatedWorkOrderData = await updateWorkOrder(editingWorkOrder.id, formData)
      if (dataAsset.id) {
        if (!dataAsset.maintenance?.next) {
          const updatedDataAsset = await updateAsset(dataAsset.id, { ...dataAsset, maintenance: { ...dataAsset.maintenance, next: updatedWorkOrderData.date } })
          setDataAsset(updatedDataAsset)
        } else {
          const updatedDataAsset = await updateAsset(dataAsset.id, { ...dataAsset, maintenance: { ...dataAsset.maintenance, next: getClosestDate(updatedWorkOrderData.date, dataAsset.maintenance.next) } })
          setDataAsset(updatedDataAsset)
        }
      }
      setDataWorkOrders(dataWorkOrders.map(workOrder => workOrder.id === editingWorkOrder.id ? updatedWorkOrderData : workOrder))
      handleCloseOrderForm()
    } else {
      formData.branchId = Number(branchId)
      formData.companyId = Number(customerId)
      const newWorkOrderData = await cleateWorkOrder(formData)
      if (dataAsset.id) {
        if (!dataAsset.maintenance.next) {
          const updatedDataAsset = await updateAsset(dataAsset.id, { ...dataAsset, maintenance: { ...dataAsset.maintenance, next: newWorkOrderData.date } })
          setDataAsset(updatedDataAsset)
        } else {
          const updatedDataAsset = await updateAsset(dataAsset.id, { ...dataAsset, maintenance: { ...dataAsset.maintenance, next: getClosestDate(newWorkOrderData.date, dataAsset.maintenance.next) } })
          setDataAsset(updatedDataAsset)
        }
      }
      setDataWorkOrders([...dataWorkOrders, newWorkOrderData])
      handleCloseOrderForm()
    }
  }

  const handleOpenReportForm = (item = null) => {
    const workOrder = dataWorkOrders.find(wo => wo.id === item.id ? wo : null)
    setEditingWorkOrder(workOrder)
    if (isAdmin) {
      if (workOrder.type === 'PREVENTIVE') {
        setEditingWorkOrder(workOrder)
        setIsOpenPreventiveReportForm(true)
      } else if (workOrder.type === 'CORRECTIVE') {
        setEditingWorkOrder(workOrder)
        setIsOpenCorrectiveReportForm(true)
      }
    }
    if (isTechnical) {
      if (item.userId === user.id) {
        if (workOrder.type === 'PREVENTIVE') {
          setEditingWorkOrder(workOrder)
          setIsOpenPreventiveReportForm(true)
        } else if (workOrder.type === 'CORRECTIVE') {
          setEditingWorkOrder(workOrder)
          setIsOpenCorrectiveReportForm(true)
        }
      } else {
        setAlertModal({ title: 'No tiene permisos para realizar esta tarea ', message: ['Esta tarea esta reservada para para otro técnico o no se le asignado un tenido', 'Comuníquese con su Gerente de Mantenimiento para que le asigne esta tarea'] })
      }
    }
  }

  const handleCloseReportForm = () => {
    setIsOpenPreventiveReportForm(false)
    setIsOpenCorrectiveReportForm(false)
  }
  const handleSubmitPreventiveReport = async (formData) => {
    const report = {
      type: editingWorkOrder.type,
      date: formData.date,
      observations: [
        formData.observations
      ],
      recommendations: [
        formData.recommendations
      ],
      userId: editingWorkOrder.userId,
      assetId: editingWorkOrder.assetId,
      branchId: editingWorkOrder.branchId,
      companyId: editingWorkOrder.companyId,
      maintenanceActivities: [
        {
          name: "Partes inspeccionadas",
          tasks: [
            formData.inspectedParts
          ]
        },
        {
          name: "Partes remplazadas",
          tasks: [
            formData.replacedParts
          ]
        },
      ],
      preventiveMaintenance: {
        frequency: formData.frequency
      },
      correctiveMaintenance: null
    }
    await cleateReport(report)
    await handleDeleteWorkOrder(editingWorkOrder.id)
    handleCloseReportForm()
  }

  const handleSubmitCorrectiveReport = async (formData) => {
    const report = {
      type: editingWorkOrder.type,
      date: formData.date,
      observations: [
        formData.observations
      ],
      recommendations: [
        formData.recommendations
      ],
      userId: editingWorkOrder.userId,
      assetId: editingWorkOrder.assetId,
      branchId: editingWorkOrder.branchId,
      companyId: editingWorkOrder.companyId,
      maintenanceActivities: [
        {
          name: "Partes remplazadas",
          tasks: [
            formData.replacedParts
          ]
        },
      ],
      preventiveMaintenance: null,
      correctiveMaintenance: {
        issueDescription: formData.problemDescription,
        failureCause: formData.rootCause,
        postMaintenanceStatus: formData.postMaintenanceStatus,
        diagnosticActions: [
          {
            action: "Análisis del problema",
            descriptions: [
              formData.problemAnalysis
            ]
          },
          {
            action: "Partes dañadas",
            descriptions: [
              formData.damagedParts
            ]
          }
        ]
      }
    }
    await cleateReport(report)
    await handleDeleteWorkOrder(editingWorkOrder.id)
    handleCloseReportForm()
  }

  const handleDeleteWorkOrder = async (id) => {
    await deleteWorkOrder(id)
    setDataWorkOrders(dataWorkOrders.filter(workOrder => workOrder.id != id))
  }

  const getClosestDate = (date1, date2) => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffDays = Math.abs(d2 - d1)

    if (diffDays === 0) {
      return d1.toISOString().split('T')[0]
    } else if (d1 < d2) {
      return d1.toISOString().split('T')[0]
    } else {
      return d2.toISOString().split('T')[0]
    }
  }

  const tabs = [
    { id: 1, title: 'Mantenimientos programados', content: <MaintenanceTable workOrders={dataWorkOrders} openReportForm={handleOpenReportForm} /> },
    { id: 2, title: 'Historial de mantenimiento', content: <HistoryTable reports={dataReports} /> }
  ]

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de Mantenimiento
      </h1>
      <Alert title={alertModal.title} message={alertModal.message} />
      <div className='flex justify-between gap-4'>

        <table className='text-left'>
          <tbody>
            <tr>
              <th className='pb-2'>Empresa:</th>
              <td className='pl-6 pb-2'>{dataCompany.name}</td>
            </tr>
            <tr>
              <th className='pb-2'>Sucursal:</th>
              <td className='pl-6 pb-2'>{dataBranch.name}</td>
            </tr>
            <tr>
              <th className='pb-2'>Dirección:</th>
              <td className='pl-6 pb-2'>{dataBranch.location}</td>
            </tr>
            <tr>
              <th className='pb-2'>Teléfono:</th>
              <td className='pl-6 pb-2'>{dataBranch.phone}</td>
            </tr>
            <tr>
              <th className='pb-2'>Email:</th>
              <td className='pl-6 pb-2'>{dataBranch.email}</td>
            </tr>
          </tbody>
        </table>
        <Button
          icon={<PlusCircle />}
          onClick={() => handleOpenOrderForm({ ...defaultWorkOrderData, assetId: Number(assetId), status: 'Pendiente' })}
        >
          Programar mantenimiento
        </Button>
      </div>
      <h2 className='text-3xl font-bold my-5'>
        {dataAsset.name}
      </h2>
      <TabsContainer tabs={tabs} />
      <ModalForm isOpen={isOpenWorkOrderForm} onClose={handleCloseOrderForm}>
        <FormWorkOrder onSubmit={handleSubmitWorkOrder} initialData={editingWorkOrder} />
      </ModalForm>

      <ModalForm isOpen={isOpenCorrectiveReportForm} onClose={handleCloseReportForm} >
        <FormCorrectiveMaintenance onSubmit={handleSubmitCorrectiveReport} workOrder={editingWorkOrder} />
      </ModalForm >
      <ModalForm isOpen={isOpenPreventiveReportForm} onClose={handleCloseReportForm} >
        <FormPreventiveMaintenance onSubmit={handleSubmitPreventiveReport} workOrder={editingWorkOrder} />
      </ModalForm >
    </>
  )
}