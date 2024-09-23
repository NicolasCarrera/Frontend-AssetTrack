import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Search from '../../components/common/Search'
import Button from '../../components/common/Button'
import PlusCircle from '../../assets/icons/PlusCircle'
import TabsContainer from '../../components/tab/TabsContainer'
import AssetsContainer from './AssetsContainer'
import { getBranchesByClient } from '../../services/customer-branches-service/customerBranches'
import { defaultCompanyData } from '../../utils/objects/company'
import { defaultBranchData } from '../../utils/objects/branch'
import ModalForm from '../../components/common/ModalForm'
import FormAsset from './FormAsset'
import { defaultAssetData } from '../../utils/objects/asset'
import { createAsset, deleteAsset, getAllAssetsByBranchId, getAllAssetsUnderMaintenanceByBranchId, getAssetsByFilter, updateAsset } from '../../services/customer-assets-service/asset'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userAtom'

export default function ManageAsset() {
  const location = useLocation()

  const user = useRecoilValue(userState)

  const isAdmin = user.roles.some(role => role === 'Gerente de Mantenimiento')

  const { customerId } = useParams()
  const { branchId } = location.state || {}

  const [dataCompany, setDataCompany] = useState(defaultCompanyData)
  const [dataBranches, setDataBranches] = useState([defaultBranchData])

  const [dataAssets, setDataAssets] = useState([defaultAssetData])
  const [dataAssetMaintenance, setDataAssetMaintenance] = useState([defaultAssetData])

  const [selectedBranchId, setSelectedBranchId] = useState(Number(branchId))
  const [selectedDataBranch, setSelectedDataBranch] = useState(defaultBranchData)

  const [isOpenAssetForm, setIsOpenAssetForm] = useState(false)

  const [editingAsset, setEditingAsset] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDataCompany = async () => {
      if (Number(customerId)) {
        const data = await getBranchesByClient(customerId)
        setDataCompany({ ...defaultCompanyData, ...data })
        if (data.branches.length > 0) {
          setDataBranches(data.branches)
          if (!selectedBranchId) {
            setSelectedBranchId(data.branches[0].id)
            setSelectedDataBranch(data.branches.find(branch => branch.id === data.branches[0].id))
            await fetchDataAssets(data.branches[0].id)
          } else {
            setSelectedDataBranch(data.branches.find(branch => branch.id === selectedBranchId))
            await fetchDataAssets(selectedBranchId)
          }
        }
      }
    }
    fetchDataCompany()
  }, [])

  useEffect(() => {
    const fetchDataAssetsBySearch = async () => {
      const newDataAssets = await getAssetsByFilter(selectedBranchId, searchTerm)
      setDataAssets(newDataAssets)
      const assetsFiltrados = newDataAssets.filter(asset =>
        asset.maintenance && asset.maintenance.next !== ''
      )
      setDataAssetMaintenance(assetsFiltrados)
    }
    fetchDataAssetsBySearch()
  }, [searchTerm])

  const fetchDataAssets = async (branchId) => {
    const newDataAssets = await getAllAssetsByBranchId(branchId)
    setDataAssets(newDataAssets)
    const newDataAssetMaintenance = await getAllAssetsUnderMaintenanceByBranchId(branchId)
    setDataAssetMaintenance(newDataAssetMaintenance)
  }

  const handleSelectBranchById = async (e) => {
    e.preventDefault()
    const branchId = Number(e.target.value)
    setSelectedBranchId(branchId)
    setSelectedDataBranch(dataBranches.find(branch => branch.id === branchId))
    await fetchDataAssets(branchId)
  }

  const handleOpenAssetForm = (item = null) => {
    setEditingAsset(item)
    setIsOpenAssetForm(true)
  }

  const handleCloseAssetForm = () => {
    setIsOpenAssetForm(false)
    setEditingAsset(null)
  }

  const handleSubmitAsset = async (formData) => {
    if (editingAsset?.id) {
      const updatedAssetData = await updateAsset(editingAsset.id, formData)
      setDataAssets(dataAssets.map(asset => asset.id === editingAsset.id ? updatedAssetData : asset))
      handleCloseAssetForm()
    } else {
      const newAssetData = await createAsset(formData)
      setDataAssets([...dataAssets, newAssetData])
      handleCloseAssetForm()
    }
  }

  const handleDeleteAsset = async (id) => {
    await deleteAsset(id)
    setDataAssets(dataAssets.filter(company => company.id !== id))
  }

  const tabs = [
    { id: 0, title: 'Todos los activos', content: <AssetsContainer assetData={dataAssets} /> },
    { id: 1, title: 'Activos en mantenimiento', content: <AssetsContainer assetData={dataAssetMaintenance} /> }
  ]

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de Activos
      </h1>
      <table className='text-left'>
        <tbody>
          <tr>
            <th className='pb-2'>Empresa:</th>
            <td className='pl-6 pb-2'>{dataCompany.name}</td>
          </tr>
          <tr>
            <th className='py-2'>Sucursal:</th>
            <td className='pl-6'>
              <div className='w-fit border border-[#0F0E17] rounded-full px-4'>
                <select
                  className='py-2'
                  value={selectedBranchId}
                  onChange={(e) => handleSelectBranchById(e)}
                >
                  {
                    dataBranches.map(item => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <th className='py-2'>Dirección:</th>
            <td className='pl-6 py-2'>{selectedDataBranch?.address}</td>
          </tr>
          <tr>
            <th className='py-2'>Teléfono:</th>
            <td className='pl-6 py-2'>{selectedDataBranch?.phone}</td>
          </tr>
          <tr>
            <th className='pt-2'>Email:</th>
            <td className='pl-6 pt-2'>{selectedDataBranch?.email}</td>
          </tr>
        </tbody>
      </table>
      <h2 className='text-3xl font-bold my-5'>
        Activos
      </h2>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
        <Search onSearch={setSearchTerm} />
        {
          isAdmin &&
          <Button
            icon={<PlusCircle />}
            onClick={() => handleOpenAssetForm({ ...defaultAssetData, branchId: selectedBranchId })}
          >
            Agregar un nuevo activo
          </Button>
        }
      </div>
      <TabsContainer tabs={tabs} />
      <ModalForm isOpen={isOpenAssetForm} onClose={handleCloseAssetForm}>
        <FormAsset onSubmit={handleSubmitAsset} initialData={editingAsset} />
      </ModalForm>

    </>
  )
}