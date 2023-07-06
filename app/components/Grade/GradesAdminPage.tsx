/* eslint-disable no-case-declarations */
'use client'
import { useState } from 'react'
import SearchField from '../Common/SearchField'
import Button from '../Common/Button'
import { THead } from '../Common/THead'
import { TBodySkeleton } from '../Common/TBodySkeleton'
import { NewGradeModal } from './NewGradeModal'
import { GradeTBody } from './GradeTBody'
import GradeDetails from './GradeDetails'
import { useQuery } from '@tanstack/react-query'
import { GradeType } from '@/app/types/grade'
import { getManyGrades } from '@/app/lib/grade/getManyGrades'
import { SelectSubject } from '../Inputs/SelectSubject'

export default function GradesAdminPage() {
  const [openModal, setOpenModal] = useState(false)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [subjectId, setSubjectId] = useState('')

  const { data, isLoading } = useQuery<GradeType[]>({
    queryKey: ['gradesList', { studentId: queryName, subjectId }],
    queryFn: () => getManyGrades(queryName, subjectId),
  })

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        <SelectSubject
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenModal(true)}
            type="button"
            value="Cadastrar Nota"
          />
          {openModal && (
            <NewGradeModal
              modalBoolean={openModal}
              setOpenModal={setOpenModal}
            />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200 dark:border-zinc-600">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <THead
            heads={[
              'Nome',
              'Turma',
              'Nota',
              'Disciplina',
              'Frequência',
              'Status',
              'Detalhes',
            ]}
          />
          {isLoading ? (
            <TBodySkeleton />
          ) : (
            <GradeTBody grades={data} setCurrentOpenId={setCurrentOpenId} />
          )}
        </table>
        <GradeDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
        />
      </div>
    </div>
  )
}
