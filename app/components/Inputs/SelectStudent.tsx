import { StudentType } from '@/app/types/student'
import { UseFormRegister } from 'react-hook-form'
import { InputWrapper } from './InputWrapper'
import { useQuery } from '@tanstack/react-query'
import { getStudents } from '@/app/utils/student/getStudents'

interface SelectStudentProps {
  label: string
  register: UseFormRegister<any>
  registerName: string
}

export function SelectStudent({
  label,
  register,
  registerName,
}: SelectStudentProps) {
  const { data } = useQuery({
    queryKey: ['studentsList', { queryName: '', classId: '' }],
    queryFn: () => getStudents('', ''),
  })

  return (
    <InputWrapper mandatory label={label}>
      <select
        className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
        {...register(`${registerName}`)}
      >
        <option value="">Selecione Aluno</option>
        {data?.map((student: StudentType) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}
