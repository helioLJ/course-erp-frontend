/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useState } from 'react'
import { StudentEditForm } from './StudentEditForm'
import { IndividualData } from '../Common/IndividualData'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'
import { getStudent } from '@/app/utils/student/getStudent'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StudentType } from '@/app/types/student'
import { deleteStudent } from '@/app/utils/student/deleteStudent'

interface StudentDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
}

export default function StudentDetails({
  detailsOpenId,
  setDetailsOpenId,
}: StudentDetailsModalProps) {
  const isOpen = detailsOpenId !== ''
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const queryClient = useQueryClient()

  const { data } = useQuery<StudentType>({
    queryKey: ['currentStudent', detailsOpenId],
    queryFn: () => getStudent(detailsOpenId),
  })

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['studentsList'])
    },
  })

  function handleDelete() {
    deleteStudentMutation.mutate(detailsOpenId)
    handleClose()
  }

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
              deleteUser={handleDelete}
            />
          </div>
          {!editing ? (
            <>
              <div className="pb-6 text-center">
                {data?.name === '' && data?.class?.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">{data?.name}</h1>
                    <span className="text-zinc-400">{data?.class?.name}</span>
                  </div>
                )}
              </div>
              <div className="flex w-full">
                <IndividualData label="Email" value={data?.email} />
                <IndividualData label="Senha" value={data?.password} password />
              </div>
              <div className="flex w-full">
                <IndividualData label="Status" value={data?.status} />
                <IndividualData label="Telefone" value={data?.phone} />
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Data de Nascimento"
                  value={data?.birthday}
                  date
                />
                <IndividualData label="Endereço" value={data?.address} />
              </div>
              <div className="flex w-full">
                <IndividualData label="CPF" value={data?.CPF} />
                <IndividualData label="RG" value={data?.RG} />
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Núm. de Matrí."
                  value={data?.registration_number}
                />
                <IndividualData
                  label="Data de Matrí."
                  value={data?.registration_day}
                  date
                />
              </div>
              <div className="flex w-full">
                <IndividualData label="Pai" value={data?.father} />
                <IndividualData label="Mãe" value={data?.mother} />
              </div>
              <div className="flex w-full">
                <IndividualData
                  label="Observações"
                  value={data?.observations}
                  textarea
                />
              </div>
            </>
          ) : (
            <StudentEditForm studentData={data} handleClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  )
}
