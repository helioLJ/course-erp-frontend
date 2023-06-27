/* eslint-disable no-case-declarations */
'use client'

import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import SearchField from '../Common/SearchField'
import Button from '../Common/Button'
import { toast } from 'react-hot-toast'
import { TeacherTHead } from './TeacherTHead'
import { TBodySkeleton } from '../Common/TBodySkeleton'
import { TeacherTBody } from './TeacherTBody'
import TeacherDetails from './TeacherDetails'
import { NewTeacherModal } from './NewTeacherModal'
import { TeacherType } from '@/app/types/teacher'

export default function TeachersAdminPage() {
  const [openTeacherModal, setOpenTeacherModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentOpenId, setCurrentOpenId] = useState('')
  const [queryName, setQueryName] = useState('')
  const [teachers, setTeachers] = useState<TeacherType[]>([])

  async function getTeachers(queryName: string) {
    setLoading(true)
    let tempTeachers: TeacherType[] = []

    switch (true) {
      case queryName !== '':
        const { data: data4 } = await api.get(`/teacher?name=${queryName}`)
        tempTeachers = data4.teachers
        break
      case queryName === '':
        const { data: data1 } = await api.get('/teacher')
        tempTeachers = data1.teachers
        break
      default:
        break
    }

    setTeachers(tempTeachers)
    setLoading(false)
  }

  async function createTeacher(teacherData: any) {
    async function postTeacher() {
      await api.post(`/teacher`, teacherData)
    }

    try {
      const myPromise = postTeacher()
      toast.promise(myPromise, {
        loading: 'Criando professor...',
        success: 'Professor criado!',
        error: 'Houve um erro!',
      })
      await myPromise
      setOpenTeacherModal(false)
      await getTeachers('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTeachers(queryName)
  }, [queryName])

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 mt-36 flex items-center justify-between gap-5">
        <SearchField value={queryName} onChange={setQueryName} />
        <div className="w-full max-w-[150px]">
          <Button
            onClick={() => setOpenTeacherModal(true)}
            type="button"
            value="Novo Professor"
          />
          {openTeacherModal && (
            <NewTeacherModal
              modal={openTeacherModal}
              setOpenModal={setOpenTeacherModal}
              createTeacher={createTeacher}
            />
          )}
        </div>
      </div>
      <div className="rounded-lg border-x-2 border-gray-200 dark:border-zinc-600">
        <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
          <TeacherTHead />
          {loading ? (
            <TBodySkeleton />
          ) : (
            <TeacherTBody
              teachers={teachers}
              setCurrentOpenId={setCurrentOpenId}
            />
          )}
        </table>
        <TeacherDetails
          detailsOpenId={currentOpenId}
          setDetailsOpenId={setCurrentOpenId}
          updateTable={getTeachers}
        />
      </div>
    </div>
  )
}
