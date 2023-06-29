/* eslint-disable no-case-declarations */
'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import SearchField from '../Common/SearchField'
import Button from '../Common/Button'
import { toast } from 'react-hot-toast'
import { THead } from '../Common/THead'
import { TBodySkeleton } from '../Common/TBodySkeleton'
import { GradeType } from '@/app/types/grade'
import { NewGradeModal } from './NewGradeModal'
import { GradeTBody } from './GradeTBody'
import GradeDetails from './GradeDetails'

export default function GradesAdminPage() {
  const [openGradeModal, setOpenGradeModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [grades, setGrades] = useState<GradeType[]>([])

  async function getGrades(queryName: string) {
    setLoading(true)
    let tempGrades: GradeType[] = []

    switch (true) {
      case queryName !== '':
        const { data: data4 } = await api.get(`/grade?name=${queryName}`)
        tempGrades = data4.transformedGrades
        break
      case queryName === '':
        const { data: data1 } = await api.get('/grade')
        tempGrades = data1.transformedGrades
        break
      default:
        break
    }

    console.log(tempGrades)
    setGrades(tempGrades)
    setLoading(false)
  }

  async function createGrade(gradeData: any) {
    async function postGrade() {
      await api.post(`/grade`, gradeData)
    }

    try {
      const myPromise = postGrade()
      toast.promise(myPromise, {
        loading: 'Cadastrando nota...',
        success: 'Nota cadastrada!',
        error: 'Houve um erro!',
      })
      await myPromise
      setOpenGradeModal(false)
      await getGrades('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGrades(queryName)
  }, [queryName])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenGradeModal(true)}
            type="button"
            value="Cadastrar Nota"
          />
          {openGradeModal && (
            <NewGradeModal
              modal={openGradeModal}
              setOpenModal={setOpenGradeModal}
              createGrade={createGrade}
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
              'Frequência',
              'Status',
              'Detalhes',
            ]}
          />
          {loading ? (
            <TBodySkeleton />
          ) : (
            <GradeTBody grades={grades} setCurrentOpenId={setCurrentOpenId} />
          )}
        </table>
        <GradeDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
          updateTable={getGrades}
        />
      </div>
    </div>
  )
}
