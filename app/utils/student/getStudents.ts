import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'

export async function getStudents(queryName = '', classId = '') {
  const { data } = await api.get(
    `/student?name=${
      queryName.charAt(0).toUpperCase() + queryName.slice(1)
    }&classId=${classId}`,
  )
  return data.students as StudentType[]
}
