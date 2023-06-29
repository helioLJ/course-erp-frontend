import { Dispatch, SetStateAction } from 'react'
import { GradeType } from '@/app/types/grade'
import GradeRow from './GradeRow'

interface GradeTBodyProps {
  grades: GradeType[]
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export function GradeTBody({ grades, setCurrentOpenId }: GradeTBodyProps) {
  return (
    <tbody className="block lg:table-row-group">
      {!!grades &&
        grades.map((grade: GradeType) => (
          <GradeRow
            key={grade.id}
            id={grade.id}
            grade={grade.grade}
            frequency={grade.frequency}
            student={grade.student}
            subject={grade.subject}
            setCurrentOpenId={setCurrentOpenId}
          />
        ))}
    </tbody>
  )
}
