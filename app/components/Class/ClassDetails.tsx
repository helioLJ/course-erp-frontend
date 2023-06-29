/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { api } from '@/app/lib/api'
import { IndividualData } from '../Common/IndividualData'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'
import { ClassEditForm } from './ClassEditForm'
import { ClassesType } from '@/app/types/classes'

interface ClassDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
  updateTable: (queryName: string) => Promise<void>
}

export default function ClassDetails({
  detailsOpenId,
  setDetailsOpenId,
  updateTable,
}: ClassDetailsModalProps) {
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const [classData, setClassData] = useState<ClassesType>({
    id: '',
    name: '',
    period: '',
    start_day: new Date(),
    end_day: new Date(),
  })

  const isOpen = detailsOpenId !== ''

  async function getClass() {
    if (detailsOpenId !== '') {
      const { data } = await api.get(`/class/${detailsOpenId}`)
      setClassData(data.classItem)
    }
  }

  async function updateClass(classData: any) {
    async function putClass() {
      await api.put(`/class/${detailsOpenId}`, classData)
    }

    try {
      const myPromise = putClass()
      toast.promise(myPromise, {
        loading: 'Editando turma...',
        success: 'Turma editado!',
        error: 'Houve um erro!',
      })
      await myPromise
      getClass()
      setEditing(false)
      updateTable('')
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteClass() {
    async function deleteClass() {
      await api.delete(`/class/${detailsOpenId}`)
    }

    try {
      const myPromise = deleteClass()
      toast.promise(myPromise, {
        loading: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Você não pode deletar essa turma pois existem alunos nela!',
      })
      await myPromise
      updateTable('')
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClass()
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
              deleteUser={deleteClass}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                {classData.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">{classData.name}</h1>
                  </div>
                )}
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Início"
                  date
                  value={classData.start_day}
                />
                <IndividualData
                  label="Término"
                  date
                  value={classData.end_day}
                />
              </div>
              <div className="flex w-full">
                <IndividualData label="Período" value={classData.period} />
                <IndividualData label="Status" value={classData.period} />
              </div>
            </>
          ) : (
            <ClassEditForm classData={classData} updateClass={updateClass} />
          )}
        </div>
      </div>
    </div>
  )
}
