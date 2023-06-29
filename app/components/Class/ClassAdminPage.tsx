/* eslint-disable no-case-declarations */
'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import SearchField from '../Common/SearchField'
import Button from '../Common/Button'
import { toast } from 'react-hot-toast'
import { TBodySkeleton } from '../Common/TBodySkeleton'
import { THead } from '../Common/THead'
import { NewClassModal } from './NewClassModal'
import { ClassTBody } from './ClassTBody'
import ClassDetails from './ClassDetails'
import { ClassesType } from '@/app/types/classes'

export default function ClassAdminPage() {
  const [openClassModal, setOpenClassModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [classes, setClasses] = useState<ClassesType[]>([])

  async function getClasses(queryName: string) {
    setLoading(true)
    let tempClasses: ClassesType[] = []

    switch (true) {
      case queryName !== '':
        const { data: data4 } = await api.get(`/class?name=${queryName}`)
        tempClasses = data4.classes
        break
      case queryName === '':
        const { data: data1 } = await api.get('/class')
        tempClasses = data1.classes
        break
      default:
        break
    }

    setClasses(tempClasses)
    setLoading(false)
  }

  async function createClass(classData: any) {
    async function postClass() {
      await api.post(`/class`, classData)
    }

    try {
      const myPromise = postClass()
      toast.promise(myPromise, {
        loading: 'Criando Turma...',
        success: 'Turma criada!',
        error: 'Houve um erro!',
      })
      await myPromise
      setOpenClassModal(false)
      await getClasses('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClasses(queryName)
  }, [queryName])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenClassModal(true)}
            type="button"
            value="Nova Turma"
          />
          {openClassModal && (
            <NewClassModal
              modal={openClassModal}
              setOpenModal={setOpenClassModal}
              createClass={createClass}
            />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200 dark:border-zinc-600">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <THead
            heads={[
              'Nome',
              'Início',
              'Término',
              'Período',
              'Status',
              'Detalhes',
            ]}
          />
          {loading ? (
            <TBodySkeleton />
          ) : (
            <ClassTBody classes={classes} setCurrentOpenId={setCurrentOpenId} />
          )}
        </table>
        <ClassDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
          updateTable={getClasses}
        />
      </div>
    </div>
  )
}
