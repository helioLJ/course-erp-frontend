/* eslint-disable react-hooks/exhaustive-deps */
import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'

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
  initialValue?: { name: string; id: string }
  all?: boolean
}

export default function BasicSelect({
  value,
  onChange,
  initialValue,
  all = true,
}: BasicSelectProps) {
  const handleChange = (event: any) => {
    const selectedName = event.target.value as string
    if (selectedName === 'Todas' || selectedName === '') {
      onChange({ name: selectedName, id: '' })
      return
    }
    const selectedClass = classes.find(
      (classObj: ClassesType) => classObj.name === selectedName,
    )

    if (selectedClass) {
      const { id } = selectedClass
      onChange({ name: selectedName, id })
    }
  }

  const [classes, setClasses] = useState<ClassesType[]>([])

  async function getClasses() {
    const { data } = await api.get('/class')
    setClasses(data.classes)
  }

  useEffect(() => {
    if (initialValue) {
      onChange(initialValue)
    }
    getClasses()
  }, [])

  return (
    <select
      className="rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-800"
      value={value.name}
      onChange={handleChange}
    >
      {all && <option value="Todas">Todas</option>}
      {classes &&
        classes.map((classObj: ClassesType) => (
          <option key={classObj.id} value={classObj.name}>
            {classObj.name}
          </option>
        ))}
    </select>
  )
}
