/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ClassesType } from './BasicSelect'
import { api } from '@/app/lib/api'
import InputMask from 'react-input-mask'

interface IndividualDataFormProps {
  label: string
  value?: string | number
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
  // const [status, setStatus] = useState('')
  // const [classname, setClassname] = useState<{ name: string; id: string }>({
  //   name: '',
  //   id: '',
  // })

  let initialValue: any = value

  if (date) {
    initialValue = dayjs(value, 'YYYY/MM/DD').format('YYYY-MM-DD')
  }

  // function changeSelect(className: string) {
  //   const desiredClass: any = classes.find((item) => item.name === className)
  //   register(desiredClass.id)
  //   setClassname({ name: className, id: desiredClass.id })
  // }

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
          <input
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-2 placeholder:text-zinc-400"
            type="date"
            value={initialValue}
            {...register(`${registerName}`)}
          />
        ) : password ? (
          <input
            className="relative w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            type={`${show ? 'password' : 'text'}`}
            value={initialValue}
            {...register(`${registerName}`)}
          />
        ) : textarea ? (
          <textarea
            className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            defaultValue={initialValue}
            {...register(`${registerName}`)}
          />
        ) : select ? (
          <select
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={initialValue}
            {...register(`${registerName}`)}
          >
            <option></option>
            {classes &&
              classes.map((classObj: ClassesType) => (
                <option key={classObj.id} value={classObj.id}>
                  {classObj.name}
                </option>
              ))}
          </select>
        ) : selectStatus ? (
          <select
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={initialValue}
            {...register(`${registerName}`)}
          >
            <option selected value="Matriculado">
              Matriculado
            </option>
            <option value="Terminou">Terminou</option>
            <option value="Trancou">Trancou</option>
            <option value="Desistente">Desistente</option>
          </select>
        ) : label === 'CPF' ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={initialValue}
            mask="999.999.999-99"
            placeholder="999.999.999-99"
            {...register(`${registerName}`)}
          />
        ) : label === 'RG' ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={initialValue}
            mask="99.999.999-9"
            placeholder="99.999.999-9"
            {...register(`${registerName}`)}
          />
        ) : label === 'Telefone' ? (
          <InputMask
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={initialValue}
            mask="(99) 99999-9999"
            placeholder="(00) 00000-0000"
            {...register(`${registerName}`)}
          />
        ) : (
          <input
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            type={`${type}`}
            value={initialValue}
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
