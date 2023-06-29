import { Dispatch, SetStateAction } from 'react'
import ClassRow from './ClassRow'
import { ClassesType } from '@/app/types/classes'

interface ClassTBodyProps {
  classes: ClassesType[]
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export function ClassTBody({ classes, setCurrentOpenId }: ClassTBodyProps) {
  return (
    <tbody className="block lg:table-row-group">
      {!!classes &&
        classes.map((classObj: ClassesType) => (
          <ClassRow
            key={classObj.id}
            id={classObj.id}
            name={classObj.name}
            start_day={classObj.start_day}
            end_day={classObj.end_day}
            period={classObj.period}
            setCurrentOpenId={setCurrentOpenId}
          />
        ))}
    </tbody>
  )
}
