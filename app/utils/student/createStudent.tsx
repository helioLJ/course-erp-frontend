import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'
import toast from 'react-hot-toast'

export async function createStudent(studentData: StudentType) {
  const updatedData = {
    ...studentData,
    status: 'Matriculado',
  }

  const myPromise = api.post(`/student`, updatedData)

  try {
    toast.promise(Promise.resolve(myPromise), {
      loading: 'Criando Aluno...',
      success: 'Aluno criado!',
      error: 'Houve um erro!',
    })
  } catch (error) {
    console.log(error)
  }
}
