/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StudentEditForm } from './StudentEditForm'
import { api } from '@/app/lib/api'
import { IndividualData } from '../Common/IndividualData'
import { StudentType } from '@/app/types/student'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'

interface StudentDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
  updateTable: (queryName: string, queryClassId: string) => Promise<void>
}

export default function StudentDetails({
  detailsOpenId,
  setDetailsOpenId,
  updateTable,
}: StudentDetailsModalProps) {
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const [studentData, setStudentData] = useState<StudentType>({
    id: '',
    email: '',
    password: '',
    name: '',
    status: '',
    phone: '',
    birthday: '',
    CPF: '',
    RG: '',
    address: '',
    father: '',
    mother: '',
    observations: '',
    registration_day: '',
    registration_number: 0,
    classId: '',
    class: {
      name: '',
    },
  })

  const isOpen = detailsOpenId !== ''

  async function getStudent() {
    if (detailsOpenId !== '') {
      const { data } = await api.get(`/student/${detailsOpenId}`)
      setStudentData(data.student)
    }
  }

  async function updateStudent(studentData: any) {
    async function putStudent() {
      await api.put(`/student/${detailsOpenId}`, studentData)
    }

    try {
      const myPromise = putStudent()
      toast.promise(myPromise, {
        loading: 'Editando perfil...',
        success: 'Perfil editado!',
        error: 'Houve um erro!',
      })
      await myPromise // Aguarda a conclusão da criação do estudante
      getStudent()
      setEditing(false)
      updateTable('', '')
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteStudent() {
    async function deleteStudent() {
      await api.delete(`/student/${detailsOpenId}`)
    }

    try {
      const myPromise = deleteStudent()
      toast.promise(myPromise, {
        loading: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Houve um erro!',
      })
      await myPromise // Aguarda a conclusão da criação do estudante
      updateTable('', '')
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudent()
  }, [detailsOpenId])

  return (
    <div
      className={`${
        isOpen ? '-translate-x-[450px]' : null
      } fixed -right-[450px] top-0 z-50 flex h-full w-full max-w-[450px] border-2 border-gray-200 bg-white transition-transform dark:border-zinc-600 dark:bg-zinc-800`}
    >
      <div className="relative flex h-full w-full justify-center py-6 dark:border-zinc-600 dark:bg-zinc-700">
        <div className="w-full space-y-5 px-6">
          <div className="flex justify-between">
            <DetailsModalButtons
              editing={editing}
              setEditing={setEditing}
              handleClose={handleClose}
              deleteUser={deleteStudent}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                {studentData.name === '' && studentData.class.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">{studentData.name}</h1>
                    <span className="text-zinc-400">
                      {studentData.class.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex w-full">
                <IndividualData label="Email" value={studentData.email} />
                <IndividualData
                  label="Senha"
                  value={studentData.password}
                  password
                />
              </div>
              <div className="flex w-full">
                <IndividualData label="Status" value={studentData.status} />
                <IndividualData label="Telefone" value={studentData.phone} />
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Data de Nascimento"
                  value={studentData.birthday}
                  date
                />
                <IndividualData label="Endereço" value={studentData.address} />
              </div>
              <div className="flex w-full">
                <IndividualData label="CPF" value={studentData.CPF} />
                <IndividualData label="RG" value={studentData.RG} />
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Núm. de Matrí."
                  value={studentData.registration_number}
                />
                <IndividualData
                  label="Data de Matrí."
                  value={studentData.registration_day}
                  date
                />
              </div>
              <div className="flex w-full">
                <IndividualData label="Pai" value={studentData.father} />
                <IndividualData label="Mãe" value={studentData.mother} />
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Observações"
                  value={studentData.observations}
                  textarea
                />
              </div>
            </>
          ) : (
            <StudentEditForm
              studentData={studentData}
              updateStudent={updateStudent}
            />
          )}
        </div>
      </div>
    </div>
  )
}
