/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import UserImg from '../../assets/User.png'
import { DetailsModalButtons } from '../Common/DetailsModalButtons'
import { GradeEditForm } from './GradeEditForm'
import { GradeType } from '@/app/types/grade'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStudentGrades } from '@/app/lib/grade/getStudentGrades'
import { toast } from 'react-hot-toast'
import { deleteGrade } from '@/app/lib/grade/deleteGrade'

interface GradeDetailsModalProps {
  detailsOpenId: string
  setDetailsOpenId: Dispatch<SetStateAction<string>>
}

let loadingToastId: string

export default function GradeDetails({
  detailsOpenId,
  setDetailsOpenId,
}: GradeDetailsModalProps) {
  const isOpen = detailsOpenId !== ''
  const [editing, setEditing] = useState(false)
  const handleClose = () => setDetailsOpenId('')
  const queryClient = useQueryClient()

  const { data } = useQuery<GradeType>({
    queryKey: ['currentGrades', detailsOpenId],
    queryFn: () => getStudentGrades(detailsOpenId),
  })

  const deleteGradeMutaion = useMutation({
    mutationFn: deleteGrade,
    onError: (error) => {
      console.log(error)
      toast.error('Houve um erro!', { id: loadingToastId })
    },
    onSuccess: () => {
      toast.success('Nota deletada com sucesso!', { id: loadingToastId })
      queryClient.invalidateQueries(['gradesList'])
    },
  })

  function handleDelete() {
    loadingToastId = toast.loading('Deletando nota...')
    deleteGradeMutaion.mutate(detailsOpenId)
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
                {data?.student?.name === '' ? (
                  <>
                    <h1 className="text-3xl font-bold">Carregando...</h1>
                    <span className="text-zinc-400">Carregando...</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Image src={UserImg} alt="Ícone de Estudante" />
                    <h1 className="text-3xl font-bold">
                      {data?.student?.name}
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex w-full"></div>
            </>
          ) : (
            <GradeEditForm gradeData={data} handleClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  )
}
