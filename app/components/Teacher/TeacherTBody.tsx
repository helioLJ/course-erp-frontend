import { Dispatch, SetStateAction } from 'react'
import TeacherRow from './TeacherRow'
import { TeacherType } from '@/app/types/teacher'

interface TeacherTBodyProps {
  teachers: TeacherType[]
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export function TeacherTBody({
  teachers,
  setCurrentOpenId,
}: TeacherTBodyProps) {
  return (
    <tbody className="block lg:table-row-group">
      {!!teachers &&
        teachers.map((teacher: TeacherType) => (
          <TeacherRow
            key={teacher.id}
            id={teacher.id}
            name={teacher.name}
            email={teacher.email}
            phone={teacher.phone}
            CPF={teacher.CPF}
            RG={teacher.RG}
            setCurrentOpenId={setCurrentOpenId}
          />
        ))}
    </tbody>
  )
}
