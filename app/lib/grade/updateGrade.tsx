import { api } from '@/app/lib/api'
import { toast } from 'react-hot-toast'

export async function updateGrade(data: {
  data: any
  gradeId: string | undefined
}) {
  const myPromise = api.put(`/grade/${data.gradeId}`, data.data)

  try {
    toast.promise(Promise.resolve(myPromise), {
      loading: 'Editando nota...',
      success: 'Nota editada!',
      error: 'Houve um erro!',
    })
  } catch (error) {
    console.error(error)
  }
}
