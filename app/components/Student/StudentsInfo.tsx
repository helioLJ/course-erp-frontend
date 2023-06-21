import { StudentType } from '@/app/types/student'

interface StudentsInfoProps {
  students: StudentType[]
}

export function StudentsInfo({ students }: StudentsInfoProps) {
  return (
    <div className="self-end">
      <p>
        <strong>Total de alunos:</strong> {!!students && students.length}
      </p>
      <p>
        <strong>Pagantes e Pendentes:</strong> 12/13
      </p>
    </div>
  )
}
