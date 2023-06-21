'use client'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ClassesType } from './BasicSelect'
import { api } from '@/app/lib/api'

interface IndividualDataFormProps {
  label: string
  value: string | number
  password?: boolean
  date?: boolean
  textarea?: boolean
  select?: boolean
  selectStatus?: boolean
  onChange: any
}

export function IndividualDataForm({
  label,
  value,
  password,
  date,
  onChange,
  textarea,
  select,
  selectStatus,
}: IndividualDataFormProps) {
  const [show, setShow] = useState(false)
  const [classes, setClasses] = useState<ClassesType[]>([])
  const [status, setStatus] = useState('')
  const [classname, setClassname] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })

  let initialValue: any = value

  if (date) {
    initialValue = dayjs(value, 'YYYY/MM/DD').format('YYYY-MM-DD')
  }

  function changeSelect(className: string) {
    const desiredClass: any = classes.find((item) => item.name === className)
    onChange(desiredClass.id)
    setClassname({ name: className, id: desiredClass.id })
  }

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
      <strong>{label}</strong>
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
            onChange={(e) => onChange(e.target.value)}
          />
        ) : password ? (
          <>
            {show ? (
              <input
                className="relative w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
                type="text"
                value={initialValue}
                onChange={(e) => onChange(e.target.value)}
              />
            ) : (
              <input
                className="relative w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
                type="password"
                value={initialValue}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </>
        ) : textarea ? (
          <textarea
            className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            defaultValue={initialValue}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : select ? (
          <select
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={classname.name}
            onChange={(e) => {
              changeSelect(e.target.value)
            }}
          >
            {classes &&
              classes.map((classObj: ClassesType) => (
                <option key={classObj.id} value={classObj.name}>
                  {classObj.name}
                </option>
              ))}
          </select>
        ) : selectStatus ? (
          <select
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected value="Matriculado">
              Matriculado
            </option>
            <option value="Terminou">Terminou</option>
            <option value="Trancou">Trancou</option>
            <option value="Desistente">Desistente</option>
          </select>
        ) : (
          <input
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            type="text"
            value={initialValue}
            onChange={(e) => onChange(e.target.value)}
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
    </div>
  )
}
