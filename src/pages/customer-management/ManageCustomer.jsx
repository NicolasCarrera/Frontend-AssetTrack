import { useState } from 'react'
import EllipsisVertical from '../../assets/icons/EllipsisVertical'
import Pencil from '../../assets/icons/Pencil'
import PlusCircle from '../../assets/icons/PlusCircle'
import Trash from '../../assets/icons/Trash'
import Button from '../../components/common/Button'
import Dropdown from '../../components/common/Dropdown'
import Search from '../../components/common/Search'
import { useNavigate } from 'react-router-dom'

export default function ManageCustomer() {
  const tabla1 = [
    { id: 1, data: 'Dato 1' },
    { id: 2, data: 'Dato 2' },
    { id: 3, data: 'Dato 3' },
    { id: 4, data: 'Dato 4' },
    { id: 5, data: 'Dato 5' },
    { id: 6, data: 'Dato 6' },
    { id: 7, data: 'Dato 7' },
    { id: 8, data: 'Dato 8' },
    { id: 9, data: 'Dato 9' },
    { id: 10, data: 'Dato 10' },
    { id: 11, data: 'Dato 11' },
    { id: 12, data: 'Dato 12' }
  ]

  const colums = [
    { title: 'Sucursal', value: 'name' },
    { title: 'Dirección', value: 'address' },
    { title: 'Activos registrados', value: 'assets' },
  ]
  const tabla2 = [
    { id: 1, name: 'Sucursal 1', address: 'En la china', assets: 10 },
    { id: 2, name: 'Sucursal 2', address: 'En la china', assets: 10 },
    { id: 3, name: 'Sucursal 3', address: 'En la china', assets: 10 },
    { id: 4, name: 'Sucursal 4', address: 'En la china', assets: 10 },
    { id: 5, name: 'Sucursal 5', address: 'En la china', assets: 10 }
  ]

  const navigate = useNavigate()

  const [dataCustomer, setDataCustomer] = useState(tabla1)
  const [dataBranch, setDataBranch] = useState(tabla2)

  const [customer, setCustomer] = useState({ id: null })

  const handleCustomer = (item) => {
    if (customer.id === item.id) {
      setCustomer({ id: null })
      setDataBranch([])
    } else {
      setCustomer(item)
      setDataBranch(tabla2)
    }
  }

  const handleNavigateToAssets = (customerId, branchId) => {
    navigate(`/customers/${customerId}/branch/${branchId}/assets`)
  }

  const options = [
    <div
      className='flex gap-4'
      key='edit'
    >
      <Pencil />
      <span>Ver o editar empresa</span>
    </div>,
    <div
      className='flex gap-4'
      key='add'
    >
      <PlusCircle />
      <span>Agregar nueva sucursal </span>
    </div>,
    <div
      className='flex gap-4'
      key='delete'
    >
      <Trash />
      <span>Borrar empresa</span>
    </div>
  ]
  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de clientes
      </h1>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
        <Search />
        <Button
          icon={<PlusCircle />}
          onClick={() => { }} // TODO: funcion para abrir el formulario para cliente
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
                  dataCustomer.map(item => (
                    <tr
                      className='border-b border-gray-400 hover:bg-gray-100'
                      key={item.id}
                    >
                      <td
                        className={`px-6 py-4 ${customer.id && customer.id !== item.id ? 'text-gray-400' : 'text-black'}`}
                        onClick={() => handleCustomer(item)}
                      >
                        {item.data}
                      </td>
                      <td>
                        <Dropdown options={options}>
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
                  dataBranch.map(item => (
                    <tr
                      className='border-b border-gray-400'
                      key={item.id}
                      onClick={() => handleNavigateToAssets(customer.id, item.id)}
                    >
                      {
                        colums.map(column => (
                          <td
                            className='py-4'
                            key={column.value}
                          >
                            {
                              item[column.value]
                            }
                          </td>
                        ))
                      }
                      <td key='actions'>
                        <Dropdown options={options}>
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
    </>
  )
}