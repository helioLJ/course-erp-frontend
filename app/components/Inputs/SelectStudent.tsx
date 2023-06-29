'use client'
import { api } from '@/app/lib/api'
import { StudentType } from '@/app/types/student'
import { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface SelectStudentProps {
  register: UseFormRegister<any>
  registerName: string
}

export function SelectStudent({ register, registerName }: SelectStudentProps) {
  const [data, setData] = useState<StudentType[] | []>([])

  async function getStudent() {
    const { data } = await api.get('/student')
    setData(data.students)
  }

  useEffect(() => {
    getStudent()
  }, [])

  return (
    <select
      className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
      {...register(`${registerName}`)}
    >
      <option value="">Selecione Aluno</option>
      {data &&
        data.map((student: StudentType) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
    </select>
  )
}
