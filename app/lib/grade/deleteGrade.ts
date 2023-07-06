import { api } from '@/app/lib/api'

export function deleteGrade(gradeId: string) {
  return api.delete(`/grade/${gradeId}`)
}
