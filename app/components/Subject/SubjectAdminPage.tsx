/* eslint-disable no-case-declarations */
'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import SearchField from '../Common/SearchField'
import Button from '../Common/Button'
import { toast } from 'react-hot-toast'
import { TBodySkeleton } from '../Common/TBodySkeleton'
import { THead } from '../Common/THead'
import { SubjectType } from '@/app/types/subject'
import { SubjectTBody } from './SubjectTBody'
import SubjectDetails from './SubjectDetails'
import { NewSubjectModal } from './NewSubjectModal'

export default function SubjectAdminPage() {
  const [openSubjectModal, setOpenSubjectModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [subjects, setSubjects] = useState<SubjectType[]>([])

  async function getSubjects(queryName: string) {
    setLoading(true)
    let tempSubjects: SubjectType[] = []

    switch (true) {
      case queryName !== '':
        const { data: data4 } = await api.get(`/subject?name=${queryName}`)
        tempSubjects = data4.subjects
        break
      case queryName === '':
        const { data: data1 } = await api.get('/subject')
        tempSubjects = data1.subjects
        break
      default:
        break
    }

    setSubjects(tempSubjects)
    setLoading(false)
  }

  async function createSubject(subjectData: any) {
    async function postSubject() {
      await api.post(`/subject`, subjectData)
    }

    try {
      const myPromise = postSubject()
      toast.promise(myPromise, {
        loading: 'Criando Disciplina...',
        success: 'Disciplina criada!',
        error: 'Houve um erro!',
      })
      await myPromise
      setOpenSubjectModal(false)
      await getSubjects('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSubjects(queryName)
  }, [queryName])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenSubjectModal(true)}
            type="button"
            value="Nova Disciplina"
          />
          {openSubjectModal && (
            <NewSubjectModal
              modal={openSubjectModal}
              setOpenModal={setOpenSubjectModal}
              createSubject={createSubject}
            />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200 dark:border-zinc-600">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <THead heads={['Nome', 'Detalhes']} />
          {loading ? (
            <TBodySkeleton />
          ) : (
            <SubjectTBody
              subjects={subjects}
              setCurrentOpenId={setCurrentOpenId}
            />
          )}
        </table>
        <SubjectDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
          updateTable={getSubjects}
        />
      </div>
    </div>
  )
}
