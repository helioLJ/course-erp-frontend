'use client'
import { useState } from 'react'
import { NewStudentModal } from './NewStudentModal'
import { THead } from '../Common/THead'
import SearchField from '../Common/SearchField'
import BasicSelect from '../Common/BasicSelect'
import Button from '../Common/Button'
import StudentDetails from './StudentDetails'
import { StudentTBody } from './StudentTBody'
import { TBodySkeleton } from '../Common/TBodySkeleton'
import { getStudents } from '@/app/utils/student/getStudents'
import { useQuery } from '@tanstack/react-query'
import { StudentType } from '@/app/types/student'

export default function StudentsAdminPage() {
  const [openModal, setOpenModal] = useState(false)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [classname, setClassname] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })
  // refactor this className state

  const { data, isLoading } = useQuery<StudentType[]>({
    queryKey: ['studentsList', { queryName, classId: classname.id }],
    queryFn: () => getStudents(queryName, classname.id),
  })

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        {/* Refactor this Basic Select */}
        <BasicSelect value={classname} onChange={setClassname} />
        {/* Create a 'size' prop for button */}
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenModal(true)}
            type="button"
            value="Novo Aluno"
          />
          {openModal && (
            <NewStudentModal modal={openModal} setOpenModal={setOpenModal} />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200 dark:border-zinc-600">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <THead
            heads={[
              'Nome',
              'Turma',
              'Telefone',
              'Email',
              'Status',
              'Detalhes',
              'Links',
            ]}
          />
          {isLoading ? (
            <TBodySkeleton />
          ) : (
            <StudentTBody students={data} setCurrentOpenId={setCurrentOpenId} />
          )}
        </table>
        <StudentDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
        />
      </div>
    </div>
  )
}
