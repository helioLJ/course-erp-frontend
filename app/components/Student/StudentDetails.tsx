/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StudentDetailsModalButtons } from './StudentDetailsModalButtons'
import { StudentEditForm } from './StudentEditForm'
import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'
import { IndividualData } from '../Common/IndividualData'

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
  const isOpen = detailsOpenId !== ''

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
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')

  async function fetchData() {
    const { data } = await api.get(`/student/${detailsOpenId}`)
    setStudentData(data.student)
  }

  async function updateStudent(studentData: StudentType) {
    await api.put(`/student/${detailsOpenId}`, studentData)
    fetchData()
    setEditing(false)
    updateTable('', '')
  }

  useEffect(() => {
    fetchData()
  }, [detailsOpenId])

  return (
    <div
      className={`${
        isOpen ? '-translate-x-[450px]' : null
      } absolute -right-[450px] top-0 z-50 flex h-full w-[450px] border-2 border-gray-200 bg-white transition-transform dark:border-zinc-600 dark:bg-zinc-800`}
    >
      <div className="relative flex h-full w-full justify-center py-6 dark:border-zinc-600 dark:bg-zinc-700">
        <div className="w-full space-y-5 px-6">
          <div className="flex justify-between">
            <StudentDetailsModalButtons
              editing={editing}
              setEditing={setEditing}
              handleClose={handleClose}
              updateTable={updateTable}
              studendId={studentData.id}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                <h1 className="text-3xl font-bold">{studentData.name}</h1>
                <span className="text-zinc-400">{studentData.class.name}</span>
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