'use client'
import { api } from '@/app/lib/api'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { InputWrapper } from './InputWrapper'
import { SubjectType } from '@/app/types/subject'

interface SelectSubjectProps {
  label?: string
  register?: UseFormRegister<any>
  registerName?: string
  value?: string
  onChange?: Dispatch<SetStateAction<any>>
}

export function SelectSubject({
  label,
  register,
  registerName,
  value,
  onChange,
}: SelectSubjectProps) {
  const [data, setData] = useState<SubjectType[] | null>(null)

  async function getSubjects() {
    const { data } = await api.get('/subject')
    setData(data.subjects)
  }

  useEffect(() => {
    getSubjects()
  }, [])

  if (label && register && registerName) {
    return (
      <InputWrapper mandatory label={label}>
        <select
          className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
          {...register(`${registerName}`)}
        >
          <option value="">Selecione Disciplina</option>
          {data?.map((subject: SubjectType) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </InputWrapper>
    )
  }

  return (
    <select
      className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
      value={value}
      onChange={onChange}
    >
      <option value="">Selecione Disciplina</option>
      {data?.map((subject: SubjectType) => (
        <option key={subject.id} value={subject.id}>
          {subject.name}
        </option>
      ))}
    </select>
  )
}
