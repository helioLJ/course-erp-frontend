import { api } from '@/app/lib/api'
import toast from 'react-hot-toast'

export async function deleteStudent(studentId: string) {
  console.log(studentId)
  async function deleteStudent() {
    await api.delete(`/student/${studentId}`)
  }

  try {
    const myPromise = deleteStudent()
    toast.promise(myPromise, {
      loading: 'Deletando...',
      success: 'Deletado com sucesso!',
      error: 'Houve um erro!',
    })
    await myPromise
  } catch (error) {
    console.log(error)
  }
}
