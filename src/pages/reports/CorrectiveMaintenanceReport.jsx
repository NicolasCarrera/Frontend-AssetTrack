import { useEffect, useState } from "react"
import { defaultCorrectiveReportData } from "../../utils/objects/correctiveReport"
import { getCorrectiveReportByReporId } from "../../services/work-order-maintenance-service/correctiveReport"

export default function CorrectiveMaintenanceReport({ report }) {
  const [dataReport, setDataReport] = useState(defaultCorrectiveReportData)

  useEffect(() => {
    const fetchData = async () => {
      if (report.id) {
        const newDataReport = await getCorrectiveReportByReporId(report.id)
        setDataReport(newDataReport)
      }
    }
    fetchData()
  }, [report])
  return (
    <table className="border border-black w-full">
      <thead>
        <tr className="border">
          <th className="border p-2 text-left text-xl text-gray-800" colSpan={3}>MANTENIMIENTO CORRECTIVO</th>
          <th className="border p-2">{report?.date}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <th className="border p-2 text-left">TÉCNICO ENCARGADO:</th>
          <td className="border p-2" colSpan={3}>{dataReport.technician}</td>
        </tr>
        <tr className="border">
          <th className="border p-2 text-left">FECHA DE INICIO:</th>
          <td className="border p-2">{dataReport.repairStartDate}</td>
          <th className="border p-2 text-left">FECHA DE FINALIZACIÓN:</th>
          <td className="border p-2">{dataReport.repairEndDate}</td>
        </tr>
      </tbody>

      <thead>
        <tr className="border">
          <th className="border p-2" colSpan={4}>MOTIVO DE LA AVERÍA</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td className="border p-2" colSpan={4}>
            {dataReport.rootCause}
          </td>
        </tr>
      </tbody>

      <thead>
        <tr className="border">
          <th className="border p-2" colSpan={4}>DESCRIPCIÓN DEL PROBLEMA</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td className="border p-2" colSpan={4}>
            {dataReport.problemDescription}
          </td>
        </tr>
      </tbody>

      <thead>
        <tr className="border">
          <th className="border p-2" colSpan={4}>ANÁLISIS DEL PROBLEMA</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td className="border p-2" colSpan={4}>
            {dataReport.problemAnalysis}
          </td>
        </tr>
      </tbody>

      <thead>
        <tr className="border">
          <th className="border p-2" colSpan={4}>TRABAJO REALIZADO</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td className="border p-2" colSpan={4}>
            <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
              {
                dataReport.workDescription.split(",").map((task, index) => (
                  <li key={index}>{task}</li>
                ))
              }
            </ol>
          </td>
        </tr>
      </tbody>

      <thead>
        <tr className="border">
          <th className="border p-2" colSpan={2}>PARTES AVERIADAS</th>
          <th className="border p-2" colSpan={2}>PARTES REEMPLAZADAS POR DAÑOS O DETERIORO </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td className="border p-2" colSpan={2}>
            <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
              {
                dataReport.damagedParts.split(",").map((part, index) => (
                  <li key={index}>{part}</li>
                ))
              }
            </ol>
          </td>
          <td className="border p-2" colSpan={2}>
            <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
              {
                dataReport.replacedParts.split(",").map((part, index) => (
                  <li key={index}>{part}</li>
                ))
              }
            </ol>
          </td>
        </tr>
      </tbody>

      <thead>
        <tr className="border">
          <th className="border p-2" colSpan={4}>RECOMENDACIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td className="border p-2" colSpan={4}>
            {dataReport.recommendations}
          </td>
        </tr>
      </tbody>
    </table>
  )
}