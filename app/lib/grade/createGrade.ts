import { api } from '@/app/lib/api'

export async function createGrade(data: {
  grade: number
  frequency: string
  studentId: string
  subjectId: string
}) {
  try {
    const response = await api.post(`/grade`, data)
    return response.data // Retorna os dados da resposta
  } catch (error) {
    throw new Error('Houve um erro ao cadastrar a nota.') // Lança um erro em caso de falha na requisição
  }
}
