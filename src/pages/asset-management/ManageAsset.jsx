import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Search from '../../components/common/Search'
import Button from '../../components/common/Button'
import PlusCircle from '../../assets/icons/PlusCircle'
import TabsContainer from '../../components/tab/TabsContainer'
import AssetsContainer from './AssetsContainer'

export default function ManageAsset() {
  let { customerId, branchId } = useParams()

  const datosEmpresa = {
    id: customerId,
    name: 'Nombre de la empresa',
    branch: [
      {
        id: 1,
        name: 'Sucursal 1',
        address: 'Direccion 1',
        telephone: '000000001',
        email: 'email_1@email.com'
      },
      {
        id: 2,
        name: 'Sucursal 2',
        address: 'Direccion 2',
        telephone: '000000002',
        email: 'email_2@email.com'
      },
      {
        id: 3,
        name: 'Sucursal 3',
        address: 'Direccion 3',
        telephone: '000000003',
        email: 'email_3@email.com'
      }
    ]
  }

  const tabs = [
    { id: 0, title: 'Tab 1', content: <AssetsContainer /> },
    { id: 1, title: 'Tab 2', content: <AssetsContainer /> }
  ]

  const filteredBranch = datosEmpresa.branch.find(item => item.id === parseInt(branchId))

  const [dataCustomer, setDataCustomer] = useState(datosEmpresa)
  const [selectedBranch, setSelectedBranch] = useState(filteredBranch)

  const handleSelectChange = (event) => {
    const selectedOptionId = event.target.value
    const selectedBranch = dataCustomer.branch.find(item => item.id === parseInt(selectedOptionId))
    setSelectedBranch(selectedBranch)
  }

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de Activos
      </h1>
      <table className='text-left'>
        <tr>
          <th className='pb-2'>Empresa:</th>
          <td className='pl-6 pb-2'>{dataCustomer.name}</td>
        </tr>
        <tr>
          <th className='py-2'>Sucursal:</th>
          <td className='pl-6'>
            <div className='w-fit border border-[#0F0E17] rounded-full px-4'>
              <select
                className='py-2'
                onChange={handleSelectChange}
              >
                {
                  dataCustomer.branch.map(item => (
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
          <td className='pl-6 py-2'>{selectedBranch?.address}</td>
        </tr>
        <tr>
          <th className='py-2'>Teléfono:</th>
          <td className='pl-6 py-2'>{selectedBranch?.telephone}</td>
        </tr>
        <tr>
          <th className='pt-2'>Email:</th>
          <td className='pl-6 pt-2'>{selectedBranch?.email}</td>
        </tr>
      </table>
      <h2 className='text-3xl font-bold my-5'>
        Activos
      </h2>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
        <Search />
        <Button
          icon={<PlusCircle />}
          onClick={() => { }} // TODO: funcion para abrir el formulario para activos
        >
          Agregar un nuevo activo
        </Button>
      </div>
      <TabsContainer tabs={tabs} />
    </>
  )
}