'use client'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import BasicSelect, { ClassesType } from './BasicSelect'
import { api } from '@/app/lib/api'

interface IndividualDataFormProps {
  label: string
  value: string | number
  password?: boolean
  date?: boolean
  textarea?: boolean
  select?: { name: string; id: string }
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
}: IndividualDataFormProps) {
  const [show, setShow] = useState(false)
  const [classes, setClasses] = useState<ClassesType[]>([])
  const [classname, setClassname] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  })

  let initialValue: any = value

  if (date) {
    initialValue = dayjs(value, 'YYYY/MM/DD').format('YYYY-MM-DD')
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
            value={initialValue}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : select ? (
          <BasicSelect
            value={classname}
            onChange={setClassname}
            data={classes}
            initialValue={select}
            all={false}
          />
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
