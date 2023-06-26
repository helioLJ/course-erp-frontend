/* eslint-disable no-case-declarations */
'use client'

import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'
import { useEffect, useState } from 'react'
import { NewStudentModal } from './NewStudentModal'
import { StudentTHead } from './StudentTHead'
import SearchField from '../Common/SearchField'
import BasicSelect, { ClassesType } from '../Common/BasicSelect'
import Button from '../Common/Button'
import StudentDetails from './StudentDetails'
import { toast } from 'react-hot-toast'
import { StudentTBody } from './StudentTBody'
import { StudentTBodySkeleton } from './StudentTBodySkeleton'

export default function Students() {
  const [openStudentModal, setOpenStudentModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [students, setStudents] = useState<StudentType[]>([])
  const [classes, setClasses] = useState<ClassesType[]>([])
  const [classname, setClassname] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })

  async function getStudents(queryName: string, queryClassId: string) {
    setLoading(true) // Define o estado de loading como true
    let tempStudents: StudentType[] = []

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

    setStudents(tempStudents)
    setLoading(false) // Define o estado de loading como false após o carregamento dos dados
  }

  async function getClasses() {
    const { data } = await api.get('/class')
    setClasses(data.classes)
  }

  async function createStudent(studentData: {}) {
    async function postStudent() {
      await api.post(`/student`, studentData)
    }

    try {
      const myPromise = postStudent()
      toast.promise(myPromise, {
        loading: 'Criando estudante...',
        success: 'Estudante criado!',
        error: 'Houve um erro!',
      })
      await myPromise // Aguarda a conclusão da criação do estudante
      setOpenStudentModal(false)
      await getStudents('', '') // Aguarda a atualização da tabela
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudents(queryName, classname.id)
    getClasses()
  }, [queryName, classname])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        <BasicSelect value={classname} onChange={setClassname} data={classes} />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenStudentModal(true)}
            type="button"
            value="Novo Aluno"
          />
          {openStudentModal && (
            <NewStudentModal
              modal={openStudentModal}
              setOpenModal={setOpenStudentModal}
              createStudent={createStudent}
            />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <StudentTHead />
          {loading ? (
            <StudentTBodySkeleton />
          ) : (
            <StudentTBody
              students={students}
              setCurrentOpenId={setCurrentOpenId}
            />
          )}
        </table>
        <StudentDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
          updateTable={getStudents}
        />
      </div>
    </div>
  )
}
