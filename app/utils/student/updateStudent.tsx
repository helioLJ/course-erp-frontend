import { api } from '@/app/lib/api'
import { toast } from 'react-hot-toast'

export async function updateStudent(data: {
  data: any
  id: string | undefined
}) {
  const myPromise = api.put(`/student/${data.id}`, data.data)

  try {
    toast.promise(Promise.resolve(myPromise), {
      loading: 'Editando Aluno...',
      success: 'Aluno editado!',
      error: 'Houve um erro!',
    })
  } catch (error) {
    console.error(error)
  }
}
