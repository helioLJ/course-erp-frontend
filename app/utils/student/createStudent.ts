import { api } from '@/app/lib/api'
import { toast } from 'react-hot-toast'
import { queryClient } from '../queryClient'
import { StudentType } from '@/app/types/student'

export async function createStudent(studentData: any) {
  try {
    const response = await api.post(`/student`, studentData)
    toast.promise(Promise.resolve(), {
      loading: 'Criando aluno...',
      success: 'Aluno criado!',
      error: 'Houve um erro!',
    })

    const previousList = queryClient.getQueryData<StudentType[]>('studentsList')
    // @ts-expect-error
    const updatedList = [...previousList, response.data.student]
    const sortedList = [...updatedList].sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    queryClient.setQueryData('studentsList', sortedList)
  } catch (error) {
    console.log(error)
  }
}
