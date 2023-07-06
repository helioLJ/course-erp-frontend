import { api } from '@/app/lib/api'
import { GradeType } from '@/app/types/grade'

export async function getStudentGrades(studentId: string) {
  if (studentId !== '') {
    const { data } = await api.get(`/grade/${studentId}`)
    return data.grade as GradeType
  }
  return {}
}
