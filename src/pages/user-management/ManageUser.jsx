import { useState } from 'react'
import PlusCircle from '../../assets/icons/PlusCircle'
import Pencil from '../../assets/icons/Pencil'
import Trash from '../../assets/icons/Trash'
import Button from '../../components/common/Button'
import Chip from '../../components/common/Chip'
import Search from '../../components/common/Search'
import { useEffect } from 'react'
import ChevronLeft from '../../assets/icons/ChevronLeft'
import ChevronRight from '../../assets/icons/ChevronRight'
import { getAllUsers, getUserById } from '../../services/user-role-management-service/users'
import FormUser from './FormUser'

// TODO: Añadir funcion de busqueda
// TODO: Añadir mas parametros a la tabla
// TODO: Coregir los diseños
export default function ManageUser() {

  const [data, setData] = useState([])

  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)

  const [totalPages, setTotalPages] = useState(0)

  const [totalElements, setTotalElements] = useState(0)

  const [isOpenForm, setIsOpenForm] = useState(false)

  const initialUserData = {
    id: null,
    avatar: '',
    username: '',
    names: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    documents: [
      {
        type: '',
        value: ''
      }
    ],
    status: '',
    roles: []
  }

  const [user, setUser] = useState(initialUserData)

  const openAddScreen = () => {
    setUser(initialUserData)
    toggleForm()
  }

  const openEditScreen = async (id) => {
    const userData = await getUserById(id)
    setUser(userData)
    toggleForm()
  }

  const toggleForm = () => {
    setIsOpenForm(!isOpenForm)
  }

  const colums = [
    { title: '', value: 'avatar' },
    { title: 'Nombre', value: 'username' },
    { title: 'Rol', value: 'roles' },
    { title: 'Estado', value: 'status' }
  ]

  const handleUserPage = async (page, size) => {
    const data = await getAllUsers(page, size)
    const newUserData = data.users.map(user => ({
      ...user,
      avatar: <img className='size-7 aspect-square rounded-full' src={user.avatar} alt='Avatar' />,
      status: <Chip variant='green'>{user.status}</Chip>,
      roles: user.roles ? user.roles.map(role => role.roleName).join(', ') : ''
    }))
    setData(newUserData)
    setTotalPages(data.page.totalPages)
    setTotalElements(data.page.totalElements)
  }

  useEffect(() => {
    handleUserPage(page, size)
  }, [page, size])

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de usuarios
      </h1>
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
        <Search />
        <Button
          icon={<PlusCircle />}
          onClick={openAddScreen}
        >
          Agregar un nuevo usuario
        </Button>

      </div>
      <table className='w-full'>
        <thead className='bg-[#0F0E17] text-[#FFFFFE]'>
          <tr>
            {
              colums.map(column => (
                <th
                  className='py-2'
                  key={column.value}
                >
                  {column.title}
                </th>
              ))
            }
            <th key='actions'>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => (
              <tr
                className='border-b border-gray-400'
                key={item.id}
              >
                {
                  colums.map(column => (
                    <td
                      key={column.value}
                      className='py-2'
                    >
                      {
                        item[column.value]
                      }
                    </td>
                  ))
                }
                <td key='actions'>
                  <button onClick={() => openEditScreen(item.id)}>
                    <Pencil />
                  </button>
                  <button>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='flex gap-10 justify-end py-2 bg-[#0F0E17] text-[#FFFFFE]'>
        <label className='flex gap-4'>
          <span className='hidden md:block'>
            Resultado por página
          </span>
          <div className='px-4 rounded-full bg-[#FFFFFE]'>
            <select
              className='bg-[#FFFFFE] text-[#0F0E17]'
              value={size}
              onChange={e => setSize(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
        </label>
        <span>
          {page * size + 1} - {page * size + size < totalElements ? page * size + size : totalElements} de {totalElements}
        </span>
        <div className='flex gap-5 mr-10'>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 0}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages || size >= totalElements}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <FormUser isOpen={isOpenForm} onClose={toggleForm} data={user} />
    </>
  )
}