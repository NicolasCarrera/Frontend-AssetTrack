import { useParams } from 'react-router-dom'
import TabsContainer from '../../components/tab/TabsContainer'
import MaintenanceTable from './MaintenanceTable'
import { useState } from 'react'
import HistoryTable from './HistoryTable'

export default function ManageMaintenance() {
  let { assetId } = useParams()

  const activo = {
    id: parseInt(assetId),
    name: 'Nombre del activo'
  }

  //const [dataAsset, setDataAsset] = useState(activo)

  const tabs = [
    { id: 1, title: 'Tab 1', content: <MaintenanceTable /> },
    { id: 2, title: 'Tab 2', content: <HistoryTable /> }
  ]

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de Mantenimiento
      </h1>
      <h2 className='text-3xl font-bold my-5'>
        Activos
      </h2>
      <TabsContainer tabs={tabs} />
    </>
  )
}