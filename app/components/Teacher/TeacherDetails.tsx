/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { api } from '@/app/lib/api'
import { IndividualData } from '../Common/IndividualData'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { TeacherEditForm } from './TeacherEditForm'
import { TeacherType } from '@/app/types/teacher'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'

interface TeacherDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
  updateTable: (queryName: string) => Promise<void>
}

export default function TeacherDetails({
  detailsOpenId,
  setDetailsOpenId,
  updateTable,
}: TeacherDetailsModalProps) {
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const [teacherData, setTeacherData] = useState<TeacherType>({
    id: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    CPF: '',
    RG: '',
  })

  const isOpen = detailsOpenId !== ''

  async function getTeacher() {
    if (detailsOpenId !== '') {
      const { data } = await api.get(`/teacher/${detailsOpenId}`)
      setTeacherData(data.teacher)
    }
  }

  async function updateTeacher(teacherData: any) {
    async function putTeacher() {
      await api.put(`/teacher/${detailsOpenId}`, teacherData)
    }

    try {
      const myPromise = putTeacher()
      toast.promise(myPromise, {
        loading: 'Editando perfil...',
        success: 'Perfil editado!',
        error: 'Houve um erro!',
      })
      await myPromise
      getTeacher()
      setEditing(false)
      updateTable('')
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTeacher() {
    await api.delete(`/teacher/${detailsOpenId}`)
    updateTable('')
    handleClose()
  }

  useEffect(() => {
    getTeacher()
  }, [detailsOpenId])

  return (
    <div
      className={`${
        isOpen ? '-translate-x-[450px]' : null
      } absolute -right-[450px] top-0 z-50 flex h-full w-full max-w-[450px] border-2 border-gray-200 bg-white transition-transform dark:border-zinc-600 dark:bg-zinc-800`}
    >
      <div className="relative flex h-full w-full justify-center py-6 dark:border-zinc-600 dark:bg-zinc-700">
        <div className="w-full space-y-5 px-6">
          <div className="flex justify-between">
            <DetailsModalButtons
              editing={editing}
              setEditing={setEditing}
              handleClose={handleClose}
              deleteUser={deleteTeacher}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                {teacherData.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">{teacherData.name}</h1>
                  </div>
                )}
              </div>
              <div className="flex w-full">
                <IndividualData label="Email" value={teacherData.email} />
                <IndividualData
                  label="Senha"
                  value={teacherData.password}
                  password
                />
              </div>
              <div className="flex w-full">
                <IndividualData label="Telefone" value={teacherData.phone} />
              </div>
              <div className="flex w-full">
                <IndividualData label="CPF" value={teacherData.CPF} />
                <IndividualData label="RG" value={teacherData.RG} />
              </div>
            </>
          ) : (
            <TeacherEditForm
              teacherData={teacherData}
              updateTeacher={updateTeacher}
            />
          )}
        </div>
      </div>
    </div>
  )
}
