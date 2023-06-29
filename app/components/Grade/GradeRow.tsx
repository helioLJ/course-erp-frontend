import { Dispatch, SetStateAction } from 'react'
import { Eye } from 'lucide-react'
import DefaultCell from '../Common/DefaultCell'

interface GradeRowProps {
  id: string
  grade: number
  frequency: string
  student: {
    id: string
    email: string
    name: string
    classId: string
  }
  subject: {
    id: string
    name: string
  }
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export default function GradeRow({
  grade,
  frequency,
  student,
  subject,
  id,
  setCurrentOpenId,
}: GradeRowProps) {
  return (
    <tr className="mb-4 block border-y-2 border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 dark:text-white lg:table-row">
      <DefaultCell label="Nome">{student.name}</DefaultCell>
      <DefaultCell label="Turma">{student.classId}</DefaultCell>
      <DefaultCell label="Nota">{grade}</DefaultCell>
      <DefaultCell label="Frequência">{frequency}</DefaultCell>
      <DefaultCell label="Status">Status</DefaultCell>
      <DefaultCell label="Detalhes">
        <div className="flex items-center justify-end gap-4 lg:justify-start">
          <button
            onClick={() => {
              setCurrentOpenId(id)
            }}
          >
            <Eye className="text-green-500" />
          </button>
        </div>
      </DefaultCell>
    </tr>
  )
}
