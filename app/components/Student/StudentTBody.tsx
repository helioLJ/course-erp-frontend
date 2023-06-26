import { Dispatch, SetStateAction } from 'react'
import { StudentType } from '@/app/types/student'
import StudentRow from './StudentRow'

interface StudentTBodyProps {
  students: StudentType[]
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export function StudentTBody({
  students,
  setCurrentOpenId,
}: StudentTBodyProps) {
  return (
    <tbody className="block lg:table-row-group">
      {!!students &&
        students.map((student: StudentType) => (
          <StudentRow
            key={student.id}
            id={student.id}
            name={student.name}
            className={student.class.name}
            email={student.email}
            phone={student.phone}
            setCurrentOpenId={setCurrentOpenId}
          />
        ))}
    </tbody>
  )
}
