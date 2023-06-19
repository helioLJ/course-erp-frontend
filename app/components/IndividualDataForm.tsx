'use client'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface IndividualDataFormProps {
  label: string
  value: string | number
  password?: boolean
  date?: boolean
}

export function IndividualDataForm({
  label,
  value,
  password,
  date,
}: IndividualDataFormProps) {
  const [show, setShow] = useState(false)
  let initialValue: any = value
  if (date) {
    initialValue = dayjs(value, 'YYYY/MM/DD').format('YYYY-MM-DD')
  }
  const [newValue, setNewValue] = useState(initialValue)

  function showPassword() {
    setShow(!show)
  }

  return (
    <div className="flex w-1/2 flex-col items-center">
      <strong>{label}</strong>
      <p className={`${password ? 'flex items-center gap-4' : null}`}>
        {date ? (
          <input
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-2 placeholder:text-zinc-400"
            type="date"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : password ? (
          <span>
            {show ? (
              <input
                className="relative rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            ) : (
              <input
                className="relative rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
                type="password"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            )}
          </span>
        ) : (
          <input
            className="rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
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
      </p>
    </div>
  )
}
