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
import { createUser, deleteUsers, getAllUsers, getUserByFilter, getUserById, updateUser } from '../../services/user-role-management-service/users'
import FormUser from './FormUser'
import Alert from '../../components/common/Alert'
import ModalForm from '../../components/common/ModalForm'

export default function ManageUser() {

  const [alertModal, setAlertModal] = useState({ title: '', message: [] })

  const [dataUsers, setDataUsers] = useState([])
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)

  const [totalPages, setTotalPages] = useState(0)

  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    const fetchDataUsers = async () => {
      const newDataUsers = await getAllUsers()
      setDataUsers(
        newDataUsers.map(user => refactorUserData(user))
      )
    }
    fetchDataUsers()
  }, [])

  useEffect(() => {
    const fetchDataUsers = async () => {
      const newDataUsers = await getUserByFilter(searchTerm)
      setDataUsers(newDataUsers)
    }
    fetchDataUsers()
  }, [searchTerm])

  const handleOpenForm = (item = null) => {
    setEditingUser(item)
    setIsOpenForm(true)
  }

  const handleCloseForm = () => {
    setIsOpenForm(false)
    setEditingUser(null)
  }

  const handleSubmitUser = async (formData) => {
    if (editingUser) {
      const updatedUserData = await updateUser(editingUser.id, formData)
      setDataUsers(dataUsers.map(user => user.id === editingUser.id ? refactorUserData(updatedUserData) : user))
      handleCloseForm()
      setAlertModal({ title: 'Usuario actualizado', message: ['Los datos del usuario se han actualizado'] })
    } else {
      const newUserData = await createUser(formData)
      setDataUsers([...dataUsers, refactorUserData(newUserData)])
      handleCloseForm()
      setAlertModal({ title: 'Usuario ingresado', message: ['El usuario a sido registrado exitosamente'] })
    }
  }

  const handleDeleteUser = async (id) => {
    await deleteUsers(id)
    setDataUsers(dataUsers.filter(user => user.id != id))
    setAlertModal({ title: 'Esuario eliminado ', message: ['Los datos del usuario han sido eliminados'] })
  }

  const refactorUserData = (user) => {
    return {
      ...user,
      status: <Chip variant={user.status === 'ACTIVE' ? 'green' : 'grey'}>{user.status}</Chip>,
      roles: user.roles ? user.roles.join(', ') : ''
    }
  }

  const colums = [
    { title: 'Nombre', value: 'firstName' },
    { title: 'Rol', value: 'roles' },
    { title: 'Estado', value: 'status' }
  ]

  // const handleUserPage = async (page, size) => {
  //   const data = await getAllUsers(page, size)
  //   const newUserData = data.map(user => ({
  //     ...user,
  //     status: <Chip variant='green'>{user.status}</Chip>,
  //     roles: user.roles ? user.roles.map(role => role).join(', ') : ''
  //   }))
  //   setDataUsers(newUserData)
  //   setTotalPages(data.page.totalPages)
  //   setTotalElements(data.page.totalElements)
  // }

  // useEffect(() => {
  //   handleUserPage(page, size)
  // }, [page, size])


  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de usuarios
      </h1>
      <Alert title={alertModal.title} message={alertModal.message} />
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
        <Search onSearch={setSearchTerm} />
        <Button
          icon={<PlusCircle />}
          onClick={handleOpenForm}
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
            dataUsers.map(item => (
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
                  <button onClick={async () => {
                    const user = await getUserById(item.id)
                    handleOpenForm(user)
                  }}
                  >
                    <Pencil />
                  </button>
                  <button onClick={() => handleDeleteUser(item.id)}>
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
      <ModalForm isOpen={isOpenForm} onClose={handleCloseForm} >
        <FormUser onSubmit={handleSubmitUser} initialData={editingUser} />
      </ModalForm>
    </>
  )
}