/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { api } from '@/app/lib/api'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'
import { SubjectType } from '@/app/types/subject'
import { SubjectEditForm } from './SubjectEditForm'

interface SubjectDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
  updateTable: (queryName: string) => Promise<void>
}

export default function SubjectDetails({
  detailsOpenId,
  setDetailsOpenId,
  updateTable,
}: SubjectDetailsModalProps) {
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const [subjectData, setSubjectData] = useState<SubjectType>({
    id: '',
    name: '',
  })

  const isOpen = detailsOpenId !== ''

  async function getSubject() {
    if (detailsOpenId !== '') {
      const { data } = await api.get(`/subject/${detailsOpenId}`)
      setSubjectData(data.subject)
    }
  }

  async function updateSubject(subjectData: any) {
    async function putSubject() {
      await api.put(`/subject/${detailsOpenId}`, subjectData)
    }

    try {
      const myPromise = putSubject()
      toast.promise(myPromise, {
        loading: 'Editando disciplina...',
        success: 'Disciplina editada!',
        error: 'Houve um erro!',
      })
      await myPromise
      getSubject()
      setEditing(false)
      updateTable('')
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteSubject() {
    async function deleteSubject() {
      await api.delete(`/subject/${detailsOpenId}`)
    }

    try {
      const myPromise = deleteSubject()
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
    getSubject()
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
              deleteUser={deleteSubject}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                {subjectData.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">{subjectData.name}</h1>
                  </div>
                )}
              </div>
            </>
          ) : (
            <SubjectEditForm
              subjectData={subjectData}
              updateSubject={updateSubject}
            />
          )}
        </div>
      </div>
    </div>
  )
}
