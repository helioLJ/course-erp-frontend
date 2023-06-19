/* eslint-disable no-case-declarations */
'use client'
import { useEffect, useState } from 'react'
import BasicSelect, { ClassesType } from './components/BasicSelect'
import Button from './components/Button'
import SearchField from './components/SearchField'
import { api } from './lib/api'
import StudentRow from './StudentRow'
import { NewStudentModal } from './NewStudentModal'

export interface Student {
  id: string
  email: string
  password: string
  name: string
  status: string
  phone: string
  birthday: string
  CPF: string
  RG: string
  address: string
  father: string
  mother: string
  observations: string
  registration_number: number
  registration_day: string
  classId: string
  class: {
    name: string
  }
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([])
  const [queryName, setQueryName] = useState('')
  const [classes, setClasses] = useState<ClassesType[]>([])
  const [classname, setClassname] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })
  const [openModal, setOpenModal] = useState(false)

  function handleModal() {
    setOpenModal(true)
  }

  async function fetchData(queryName: string, queryClassId: string) {
    let tempStudents: Student[] = [] // Variável temporária para armazenar os alunos

    switch (true) {
      case queryName !== '' && queryClassId !== '':
        const { data: data4 } = await api.get(
          `/student?name=${queryName}&classId=${queryClassId}`,
        )
        tempStudents = data4.students
        break
      case queryName === '' && queryClassId === '':
        const { data: data1 } = await api.get('/student')
        tempStudents = data1.students
        break
      case queryClassId !== '':
        const { data: data2 } = await api.get(
          `/student?classId=${queryClassId}`,
        )
        tempStudents = data2.students
        break
      case queryName !== '':
        const { data: data3 } = await api.get(`/student?name=${queryName}`)
        tempStudents = data3.students
        break
      default:
        break
    }

    setStudents(tempStudents) // Atualiza o estado com o valor correto
  }

  async function fetchClasses() {
    const { data } = await api.get('/class')
    setClasses(data.classes)
  }

  useEffect(() => {
    fetchData(queryName, classname.id)
    fetchClasses()
  }, [queryName, classname])

  return (
    <div className="flex h-full flex-col">
      <div className="self-end">
        <p>
          <strong>Total de alunos:</strong> {!!students && students.length}
        </p>
        <p>
          <strong>Pagantes e Pendentes:</strong> 12/13
        </p>
      </div>
      <div className="mb-4 mt-16 flex items-center justify-between gap-5">
        <h1 className="text-5xl">Alunos</h1>
        <div className="w-full max-w-[500px]">
          <SearchField value={queryName} onChange={setQueryName} />
        </div>
        <BasicSelect value={classname} onChange={setClassname} data={classes} />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => handleModal()}
            type="button"
            value="Novo Aluno"
          />
          {openModal && (
            <NewStudentModal modal={openModal} setOpenModal={setOpenModal} />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <thead className="hidden bg-white text-left lg:table-header-group">
            <tr className="border-y-2 border-gray-200 text-lg font-bold text-zinc-400">
              <th className="p-4">Nome</th>
              <th className="p-4">Turma</th>
              <th className="p-4">Telefone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Detalhes</th>
              <th className="p-4">Links</th>
            </tr>
          </thead>
          <tbody className="block lg:table-row-group">
            {!!students &&
              students.map((student: Student) => (
                <StudentRow
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  className={student.class.name}
                  email={student.email}
                  phone={student.phone}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
