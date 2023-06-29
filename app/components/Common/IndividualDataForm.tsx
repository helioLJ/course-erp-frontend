/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ClassesType } from './BasicSelect'
import { api } from '@/app/lib/api'
import InputMask from 'react-input-mask'

interface IndividualDataFormProps {
  label: string
  value?: any
  password?: boolean
  date?: boolean
  textarea?: boolean
  select?: boolean
  mandatory?: boolean
  selectStatus?: boolean
  register: any
  registerName: string
  errors?: any
  type?: string
}

export function IndividualDataForm({
  label,
  value,
  password,
  date,
  register,
  textarea,
  select,
  selectStatus,
  mandatory,
  registerName,
  errors,
  type = 'text',
}: IndividualDataFormProps) {
  const [show, setShow] = useState(false)
  const [classes, setClasses] = useState<ClassesType[]>([])

  function showPassword() {
    setShow(!show)
  }

  async function fetchClasses() {
    const { data } = await api.get('/class')
    setClasses(data.classes)
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <div className="flex w-full flex-col items-center">
      <strong>
        {label}
        {mandatory && <span className="text-red-500">*</span>}
      </strong>
      <div
        className={`${
          password
            ? 'flex h-full w-full items-center gap-4'
            : 'flex h-full w-full'
        }`}
      >
        {date ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            mask="99/99/9999"
            placeholder="00/00/0000"
            {...register(`${registerName}`)}
          />
        ) : password ? (
          <input
            className="relative w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            type={`${show ? 'password' : 'text'}`}
            value={value}
            {...register(`${registerName}`)}
          />
        ) : textarea ? (
          <textarea
            className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            defaultValue={value}
            {...register(`${registerName}`)}
          />
        ) : select ? (
          <>
            {classes && classes.length > 0 ? (
              <select
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
                {...register(`${registerName}`)}
              >
                <option value="">Selecione Turma</option>
                {classes.map((classObj: ClassesType) => (
                  <option key={classObj.id} value={classObj.id}>
                    {classObj.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>Carregando turmas...</p>
            )}
          </>
        ) : selectStatus ? (
          <select
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            value={value}
            {...register(`${registerName}`)}
          >
            <option value="Matriculado">Matriculado</option>
            <option value="Terminou">Terminou</option>
            <option value="Trancou">Trancou</option>
            <option value="Desistente">Desistente</option>
          </select>
        ) : label === 'CPF' ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            value={value}
            mask="999.999.999-99"
            placeholder="999.999.999-99"
            {...register(`${registerName}`)}
          />
        ) : label === 'RG' ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            value={value}
            mask="99.999.999-9"
            placeholder="99.999.999-9"
            {...register(`${registerName}`)}
          />
        ) : label === 'Telefone' ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            value={value}
            mask="(99) 99999-9999"
            placeholder="(00) 00000-0000"
            {...register(`${registerName}`)}
          />
        ) : (
          <input
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
            type={`${type}`}
            value={value}
            {...register(`${registerName}`)}
          />
        )}

        {password && (
          <button
            className="absolute right-14"
            type="button"
            onClick={showPassword}
          >
            <Eye />
          </button>
        )}
      </div>
      {errors && <small className="text-red-500">{errors.message}</small>}
    </div>
  )
}
