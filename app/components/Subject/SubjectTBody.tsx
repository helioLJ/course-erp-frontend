import { Dispatch, SetStateAction } from 'react'
import { SubjectType } from '@/app/types/subject'
import SubjectRow from './SubjectRow'

interface SubjectTBodyProps {
  subjects: SubjectType[]
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export function SubjectTBody({
  subjects,
  setCurrentOpenId,
}: SubjectTBodyProps) {
  return (
    <tbody className="block lg:table-row-group">
      {!!subjects &&
        subjects.map((subject: SubjectType) => (
          <SubjectRow
            key={subject.id}
            id={subject.id}
            name={subject.name}
            setCurrentOpenId={setCurrentOpenId}
          />
        ))}
    </tbody>
  )
}
