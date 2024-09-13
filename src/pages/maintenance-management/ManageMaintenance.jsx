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
import { getAssetById } from '../../services/customer-assets-service/asset'
import { defaultWorkOrderData } from '../../utils/objects/workOrder'
import { getWorkOrdersByAssetId } from '../../services/work-order-maintenance-service/workOrders'
import { defaultReportData } from '../../utils/objects/report'
import { getReportsByAssetId } from '../../services/work-order-maintenance-service/reports'

export default function ManageMaintenance() {
  const { customerId, branchId, assetId } = useParams()

  const [dataCompany, setDataCompany] = useState(defaultCompanyData)
  const [dataBranch, setDataBranch] = useState(defaultBranchData)
  const [dataAsset, setDataAsset] = useState(defaultAssetData)
  const [dataWorkOrders, setDataWorkOrders] = useState([defaultWorkOrderData])
  const [dataReports, setDataReports] = useState([defaultReportData])

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

  const tabs = [
    { id: 1, title: 'Mantenimientos programados', content: <MaintenanceTable workOrders={dataWorkOrders} /> },
    { id: 2, title: 'Historial de mantenimiento', content: <HistoryTable reports={dataReports} /> }
  ]

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de Mantenimiento
      </h1>
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
            <td className='pl-6 pb-2'>{dataBranch.address}</td>
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
      <h2 className='text-3xl font-bold my-5'>
        {dataAsset.name}
      </h2>
      <TabsContainer tabs={tabs} />
    </>
  )
}