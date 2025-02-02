import { useState } from 'react'
import PlusCircle from '../../assets/icons/PlusCircle'
import Pencil from '../../assets/icons/Pencil'
import Button from '../../components/common/Button'
import { useEffect } from 'react'
import { createUser, getAllUsers, getUserById, updateUser } from '../../services/user-role-management-service/users'
import FormUser from './FormUser'
import Alert from '../../components/common/Alert'
import ModalForm from '../../components/common/ModalForm'

export default function ManageUser() {

  const [alertModal, setAlertModal] = useState({ title: '', message: [] })

  const [dataUsers, setDataUsers] = useState([])
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    const fetchDataUsers = async () => {
      const newDataUsers = await getAllUsers()
      setDataUsers(newDataUsers)
    }
    fetchDataUsers()
  }, [])

  const handleOpenForm = (item = null) => {
    setEditingUser(item)
    setIsOpenForm(true)
  }

  const handleCloseForm = () => {
    setIsOpenForm(false)
    setEditingUser(null)
  }

  const handleSubmitUser = async (formData) => {
    if (editingUser?.id) {
      const updatedUserData = await updateUser(editingUser.id, formData)
      setDataUsers(dataUsers.map(user => user.id === editingUser.id ? updatedUserData : user))
      handleCloseForm()
      setAlertModal({ title: 'Usuario actualizado', message: ['Los datos del usuario se han actualizado'] })
    } else {
      const newUserData = await createUser(formData)
      setDataUsers([...dataUsers, newUserData])
      handleCloseForm()
      setAlertModal({ title: 'Usuario ingresado', message: ['El usuario a sido registrado exitosamente'] })
    }
  }

  const colums = [
    { title: 'Nombre del usuario', value: 'firstName' },
    { title: 'Rol del usuario', value: 'roles.name' },
    { title: 'Estado', value: 'status' }
  ]

  return (
    <>
      <h1 className='text-3xl font-bold mb-10'>
        Gestión de usuarios
      </h1>
      <Alert title={alertModal.title} message={alertModal.message} />
      <div className='flex flex-col-reverse gap-4 md:flex-row md:justify-between mb-5'>
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
                  className='py-4'
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
                className='border-b border-gray-400 hover:bg-gray-100'
                key={item.id}
              >
                {
                  colums.map(column => (
                    <td
                      key={column.value}
                      className='px-6 py-4'
                    >
                      {
                        column.value.split('.').reduce((acc, part) => acc && acc[part], item) || ''
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
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='bg-[#0F0E17] text-[#FFFFFE] h-10'>
      </div>
      <ModalForm isOpen={isOpenForm} onClose={handleCloseForm} >
        <FormUser onSubmit={handleSubmitUser} initialData={editingUser} />
      </ModalForm>
    </>
  )
}