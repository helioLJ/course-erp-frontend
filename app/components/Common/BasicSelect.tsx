/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

export interface ClassesType {
  id: string
  name: string
  start_day: string
  end_day: string
  period: string
}

interface BasicSelectProps {
  value: { name: string; id: string }
  onChange: any
  data: ClassesType[]
  initialValue?: { name: string; id: string }
  all?: boolean
}

export default function BasicSelect({
  value,
  onChange,
  data,
  initialValue,
  all = true,
}: BasicSelectProps) {
  const handleChange = (event: any) => {
    const selectedName = event.target.value as string
    if (selectedName === 'Todas' || selectedName === '') {
      onChange({ name: selectedName, id: '' })
      return
    }
    const selectedClass = data.find(
      (classObj: ClassesType) => classObj.name === selectedName,
    )

    if (selectedClass) {
      const { id } = selectedClass
      onChange({ name: selectedName, id })
    }
  }

  useEffect(() => {
    if (initialValue) {
      onChange(initialValue)
    }
  }, [])

  return (
    <select
      className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
      value={value.name}
      onChange={handleChange}
    >
      {all && <option value="Todas">Todas</option>}
      {data &&
        data.map((classObj: ClassesType) => (
          <option key={classObj.id} value={classObj.name}>
            {classObj.name}
          </option>
        ))}
    </select>
  )
}
