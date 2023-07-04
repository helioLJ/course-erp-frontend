'use client'
import { api } from '@/app/lib/api'
import { useEffect, useState } from 'react'
import { InputWrapper } from './InputWrapper'
import { ClassesType } from '@/app/types/classes'

interface SelectClassProps {
  label: string
}

export function SelectClass({ label }: SelectClassProps) {
  const [data, setData] = useState<ClassesType[] | null>(null)

  async function getClasses() {
    const { data } = await api.get('/class')
    setData(data.class)
  }

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <InputWrapper mandatory label={label}>
      <select className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700">
        <option value="">Selecione Aluno</option>
        {data?.map((classObj: ClassesType) => (
          <option key={classObj.id} value={classObj.id}>
            {classObj.name}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}
