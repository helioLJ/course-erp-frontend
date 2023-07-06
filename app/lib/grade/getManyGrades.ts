import { api } from '@/app/lib/api'
import { GradeType } from '@/app/types/grade'

export async function getManyGrades(studentName = 'a', subjectId = '') {
  const { data } = await api.get(
    `/grade?studentName=${
      studentName.charAt(0).toUpperCase() + studentName.slice(1)
    }&subjectId=${subjectId}`,
  )
  return data.transformedGrades as GradeType[]
}
