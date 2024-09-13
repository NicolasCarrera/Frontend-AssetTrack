import { useEffect, useState } from 'react'
import EllipsisVertical from '../../assets/icons/EllipsisVertical'
import Pencil from '../../assets/icons/Pencil'
import PlusCircle from '../../assets/icons/PlusCircle'
import Trash from '../../assets/icons/Trash'
import Button from '../../components/common/Button'
import Dropdown from '../../components/common/Dropdown'
import Search from '../../components/common/Search'
import { useNavigate } from 'react-router-dom'
import { createCustomer, deleteCustomer, getAllCustomers, getCustomersByName, updateCustomer } from '../../services/customer-branches-service/customer'
import FormCustomer from './FormCustomer'
import FormBranch from './FormBranch'
import ModalForm from '../../components/common/ModalForm'
import { defaultBranchData } from '../../utils/objects/branch'
import { createBranch, deleteBranch, getBranchesByCompanyId, updateBranch } from '../../services/customer-branches-service/branch'
import { defaultCompanyData } from '../../utils/objects/company'

export default function ManageCustomer() {
  const navigate = useNavigate()

  const [dataCompanies, setDataCompanies] = useState([])
  const [dataBranches, setDataBranches] = useState([])

  const [isOpenCompanyForm, setIsOpenCompanyForm] = useState(false)
  const [isOpenBranchForm, setIsOpenBranchForm] = useState(false)

  const [editingCompany, setEditingCompany] = useState(null)
  const [editingBranch, setEditingBranch] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDataCompanies = async () => {
      const newDataCompanies = await getAllCustomers()
      setDataCompanies(newDataCompanies)
    }
    fetchDataCompanies()
  }, [])

  useEffect(() => {
    const fetchDataCompanies = async () => {
      const newDataCompanies = await getCustomersByName(searchTerm)
      setDataCompanies(newDataCompanies)
    }
    fetchDataCompanies()
  }, [searchTerm])

  const handleOpenCompanyForm = (item = null) => {
    setEditingCompany(item)
    setIsOpenCompanyForm(true)
  }

  const handleOpenBranchForm = (item = null) => {
    setEditingBranch(item)
    setIsOpenBranchForm(true)
  }

  const handleCloseCompanyForm = () => {
    setIsOpenCompanyForm(false)
    setEditingCompany(null)
  }

  const handleCloseBranchForm = () => {
    setIsOpenBranchForm(false)
    setEditingBranch(null)
  }

  const handleSubmitCompany = async (formData) => {
    if (editingCompany?.id) {
      const updatedCompanyData = await updateCustomer(editingCompany.id, formData)
      setDataCompanies(dataCompanies.map(company => company.id === editingCompany.id ? updatedCompanyData : company))
      handleCloseCompanyForm()
    } else {
      const newCompanyData = await createCustomer(formData)
      setDataCompanies([...dataCompanies, newCompanyData])
      handleCloseCompanyForm()
    }
  }

  const handleSubmitBranch = async (formData) => {
    if (editingBranch?.id) {
      const updatedBranchData = await updateBranch(editingBranch.id, formData)
      setDataBranches(dataBranches.map(branch => branch.id === editingCompany.id ? updatedBranchData : branch))
      handleCloseBranchForm()
    } else {
      const newBranchData = await createBranch(formData)
      setDataBranches([...dataBranches, newBranchData])
      handleCloseBranchForm()
    }
  }

  const handleDeleteCompany = async (id) => {
    await deleteCustomer(id)
    setDataCompanies(dataCompanies.filter(company => company.id !== id))
  }

  const handleDeleteBranch = async (id) => {
    await deleteBranch(id)
    setDataBranches(dataBranches.filter(branch => branch.id !== id))
  }

  const [selectCompany, setSelectCompany] = useState(defaultCompanyData)

  const handleSelectCompany = async (item) => {
    if (selectCompany.id === item.id) {
      setSelectCompany(defaultCompanyData)
      setDataBranches([])
    } else {
      setSelectCompany(item)
      const newDataBranch = await getBranchesByCompanyId(item.id)
      setDataBranches(newDataBranch)
    }
  }

  const handleNavigateToAssets = (customerId, branchId) => {
    navigate(`/customers/${customerId}/branches`, { state: { branchId } })
  }

  const getCompanyEditingOptions = (company) => [
    <button
      className='flex gap-4'
      key='edit'
      onClick={() => handleOpenCompanyForm(company)}
    >
      <Pencil />
      <span>Ver o editar empresa</span>
    </button>,
    <div
      className='flex gap-4'
      key='add'
      onClick={() => handleOpenBranchForm({ ...defaultBranchData, companyId: company.id })}
    >
      <PlusCircle />
      <span>Agregar nueva sucursal </span>
    </div>,
    <div
      className='flex gap-4'
      key='delete'
      onClick={() => handleDeleteCompany(company.id)}
    >
      <Trash />
      <span>Borrar empresa</span>
    </div>
  ]

  const getBranchEditingOptions = (branch) => [
    <button
      className='flex gap-4'
      key='edit'
      onClick={() => handleOpenBranchForm(branch)}
    >
      <Pencil />
      <span>Ver o editar sucursal</span>
    </button>,
    <div
      className='flex gap-4'
      key='delete'
      onClick={() => handleDeleteBranch(branch.id)}
    >
      <Trash />
      <span>Borrar sucursal</span>
    </div>
  ]

  const colums = [
    { title: 'Sucursal', value: 'name' },
    { title: 'Dirección', value: 'address' },
    { title: 'Activos registrados', value: 'assets' },
  ]

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de clientes
      </h1>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
        <Search onSearch={setSearchTerm} />
        <Button
          icon={<PlusCircle />}
          onClick={handleOpenCompanyForm}
        >
          Agregar un nuevo cliente
        </Button>
      </div>
      <div className='flex gap-2'>

        <div className='w-80'>
          <div className='overflow-y-scroll h-[450px]'>
            <table className='w-full'>
              <thead className='bg-[#0F0E17] text-[#FFFFFE] sticky top-0'>
                <tr>
                  <th className='py-4'>Empresa</th>
                  <th
                    className='w-10'
                    key='action'
                  >
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  dataCompanies.length > 0 ? (
                    dataCompanies.map(item => (
                      <tr
                        className='border-b border-gray-400 hover:bg-gray-100'
                        key={item.id}
                      >
                        <td
                          className={`px-6 py-4 ${selectCompany.id && selectCompany.id !== item.id ? 'text-gray-400' : 'text-black'}`}
                          onClick={() => handleSelectCompany(item)}
                        >
                          {item.name}
                        </td>
                        <td>
                          <Dropdown options={getCompanyEditingOptions(item)}>
                            <EllipsisVertical />
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className='text-center py-4'
                        colSpan='2'
                      >
                        No hay empresas registradas
                      </td>
                    </tr>
                  )

                }
              </tbody>
            </table>
          </div>
          <div className='bg-[#0F0E17] text-[#FFFFFE] h-10'>
          </div>
        </div>

        <div className='w-full'>
          <div className='overflow-y-scroll h-[450px]'>
            <table className='w-full'>
              <thead className='bg-[#0F0E17] text-[#FFFFFE] sticky top-0'>
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
                  <th
                    className='w-10'
                    key='action'
                  ></th>
                </tr>
              </thead>
              <tbody>
                {
                  dataBranches.map(item => (
                    <tr
                      className='border-b border-gray-400'
                      key={item.id}
                      onClick={() => handleNavigateToAssets(selectCompany.id, item.id)}
                    >
                      {
                        colums.map(column => (
                          <td
                            className='px-6 py-4'
                            key={column.value}
                          >
                            {
                              item[column.value]
                            }
                          </td>
                        ))
                      }
                      <td key='actions'>
                        <Dropdown options={getBranchEditingOptions(item)}>
                          <EllipsisVertical />
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className='bg-[#0F0E17] text-[#FFFFFE] h-10'>
          </div>
        </div>
      </div>
      <ModalForm isOpen={isOpenCompanyForm} onClose={handleCloseCompanyForm} >
        <FormCustomer onSubmit={handleSubmitCompany} initialData={editingCompany} />
      </ModalForm>
      <ModalForm isOpen={isOpenBranchForm} onClose={handleCloseBranchForm}>
        <FormBranch onSubmit={handleSubmitBranch} initialData={editingBranch} />
      </ModalForm>
    </>
  )
}