/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { api } from '@/app/lib/api'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'
import { GradeEditForm } from './GradeEditForm'
import { GradeType } from '@/app/types/grade'

interface GradeDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
  updateTable: (queryName: string) => Promise<void>
}

export default function GradeDetails({
  detailsOpenId,
  setDetailsOpenId,
  updateTable,
}: GradeDetailsModalProps) {
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const [gradeData, setgradeData] = useState<GradeType>({
    id: '',
    grade: 0,
    frequency: '',
    student: {
      id: '',
      classId: '',
      email: '',
      name: '',
    },
    subject: {
      id: '',
      name: '',
    },
  })

  const isOpen = detailsOpenId !== ''

  async function getGrade() {
    if (detailsOpenId !== '') {
      const { data } = await api.get(`/grade/${detailsOpenId}`)
      setgradeData(data.grade)
      console.log(data)
    }
  }

  async function updateGrade(gradeData: any) {
    async function putGrade() {
      await api.put(`/grade/${detailsOpenId}`, gradeData)
    }

    try {
      const myPromise = putGrade()
      toast.promise(myPromise, {
        loading: 'Editando nota...',
        success: 'Nota editada!',
        error: 'Houve um erro!',
      })
      await myPromise
      getGrade()
      setEditing(false)
      updateTable('')
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteGrade() {
    async function deleteGrade() {
      await api.delete(`/grade/${detailsOpenId}`)
    }

    try {
      const myPromise = deleteGrade()
      toast.promise(myPromise, {
        loading: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Houve um erro!',
      })
      await myPromise
      updateTable('')
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getGrade()
  }, [detailsOpenId])

  return (
    <div
      className={`${
        isOpen ? '-translate-x-[450px]' : null
      } fixed -right-[450px] top-0 z-50 flex h-full w-full max-w-[450px] border-2 border-gray-200 bg-white transition-transform dark:border-zinc-600 dark:bg-zinc-800`}
    >
      <div className="relative flex h-full w-full justify-center py-6 dark:border-zinc-600 dark:bg-zinc-700">
        <div className="w-full space-y-5 px-6">
          <div className="flex justify-between">
            <DetailsModalButtons
              editing={editing}
              setEditing={setEditing}
              handleClose={handleClose}
              deleteUser={deleteGrade}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                {gradeData.student.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">
                      {gradeData.student.name}
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex w-full"></div>
            </>
          ) : (
            <GradeEditForm gradeData={gradeData} updateGrade={updateGrade} />
          )}
        </div>
      </div>
    </div>
  )
}
