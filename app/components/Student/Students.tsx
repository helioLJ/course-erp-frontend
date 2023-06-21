/* eslint-disable no-case-declarations */
'use client'

import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'
import { useEffect, useState } from 'react'
import { NewStudentModal } from './NewStudentModal'
import StudentRow from './StudentRow'
import { StudentTHead } from './StudentTHead'
import SearchField from '../Common/SearchField'
import BasicSelect, { ClassesType } from '../Common/BasicSelect'
import Button from '../Common/Button'
import StudentDetails from './StudentDetails'

export default function Students() {
  const [openStudentModal, setOpenStudentModal] = useState(false)
  const [students, setStudents] = useState<StudentType[]>([])
  const [queryName, setQueryName] = useState('')
  const [classes, setClasses] = useState<ClassesType[]>([])
  const [classname, setClassname] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })
  const [currentOpenId, setCurrentOpenId] = useState('')

  async function fetchData(queryName: string, queryClassId: string) {
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
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <div className="w-full max-w-[500px]">
          <SearchField value={queryName} onChange={setQueryName} />
        </div>
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
            />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <StudentTHead />
          <tbody className="block lg:table-row-group">
            {!!students &&
              students.map((student: StudentType) => (
                <StudentRow
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  className={student.class.name}
                  email={student.email}
                  phone={student.phone}
                  currentOpenId={currentOpenId}
                  setCurrentOpenId={setCurrentOpenId}
                />
              ))}
            <StudentDetails
              detailsOpenId={currentOpenId}
              setDetailsOpenId={setCurrentOpenId}
              updateTable={fetchData}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}
