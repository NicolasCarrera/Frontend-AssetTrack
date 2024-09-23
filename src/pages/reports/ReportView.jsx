import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { defaultCompanyData } from "../../utils/objects/company"
import { defaultBranchData } from "../../utils/objects/branch"
import { defaultAssetData } from "../../utils/objects/asset"
import { defaultReportData } from "../../utils/objects/report"
import { getCustomerById } from "../../services/customer-branches-service/customer"
import { getBranchById } from "../../services/customer-branches-service/branch"
import { getAssetById } from "../../services/customer-assets-service/asset"
import { getReportsById } from "../../services/work-order-maintenance-service/reports"
import PreventiveMaintenanceReport from "./PreventiveMaintenanceReport"
import CorrectiveMaintenanceReport from "./CorrectiveMaintenanceReport"

export default function ReportView() {
  const { reportId } = useParams()

  const [dataCompany, setDataCompany] = useState(defaultCompanyData)
  const [dataBranch, setDataBranch] = useState(defaultBranchData)
  const [dataAsset, setDataAsset] = useState(defaultAssetData)
  const [dataReport, setDataReport] = useState(defaultReportData)

  useEffect(() => {
    const fetchData = async () => {
      const newDataReport = await getReportsById(reportId)
      setDataReport(newDataReport)
      const newDataAsset = await getAssetById(newDataReport.assetId)
      setDataAsset(newDataAsset)
      const newDataBranch = await getBranchById(newDataAsset.branchId)
      setDataBranch(newDataBranch)
      const newDataCompany = await getCustomerById(newDataBranch.companyId)
      setDataCompany(newDataCompany)
    }
    fetchData()
  }, [])


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8 md:p-12 lg:p-16 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-b pb-4">REPORTE DE MANTENIMIENTO DE ACTIVOS</h1>
          <div className="space-y-4 text-gray-600 leading-relaxed border-b pb-6">
            <table className="border border-black w-full">
              <thead>
                <tr className="border">
                  <th className="border p-2" colSpan={2}>DATOS DE LA EMPRESA</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <th className="border p-2 text-left">EMPRESA:</th>
                  <td className="border p-2">{dataCompany.name}</td>
                </tr>
                <tr className="border">
                  <th className="border p-2 text-left">SUCURSAL:</th>
                  <td className="border p-2">{dataBranch.name}</td>
                </tr>
              </tbody>

              <thead>
                <tr className="border">
                  <th className="border p-2" colSpan={2}>DATOS DE CONTACTO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <th className="border p-2 text-left">DIRECCIÓN:</th>
                  <td className="border p-2">{dataBranch.address}</td>
                </tr>
                <tr className="border">
                  <th className="border p-2 text-left">EMAIL:</th>
                  <td className="border p-2">{dataBranch.email}</td>
                </tr>
                <tr className="border">
                  <th className="border p-2 text-left">TELÉFONO:</th>
                  <td className="border p-2">{dataBranch.phone}</td>
                </tr>
              </tbody>

              <thead>
                <tr className="border">
                  <th className="border p-2" colSpan={2}>DATOS GENERALES</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <th className="border p-2 text-left">ACTIVO:</th>
                  <td className="border p-2">{dataAsset.name}</td>
                </tr>
                <tr className="border">
                  <th className="border p-2 text-left">NÚMERO DE SERIE:</th>
                  <td className="border p-2">{dataAsset.serial}</td>
                </tr>
                <tr className="border">
                  <th className="border p-2 text-left">CATEGORÍA</th>
                  <td className="border p-2">{dataAsset.category}</td>
                </tr>
                <tr className="border">
                  <th className="border p-2 text-left">MARCA</th>
                  <td className="border p-2">{dataAsset.brand}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            {
              dataReport.type === 'PREVENTIVO' ?
                <PreventiveMaintenanceReport report={dataReport} /> :
                dataReport.type === 'CORRECTIVO' ?
                  <CorrectiveMaintenanceReport report={dataReport} /> :
                  <p>¡ERROR!</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}