import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'

export async function getStudent(studentId: string) {
  if (studentId !== '') {
    const { data } = await api.get(`/student/${studentId}`)
    return data.student as StudentType
  }
  return {}
}
