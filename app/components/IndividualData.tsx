'use client'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface IndividualDataProps {
  label: string
  value: string | number
  password?: boolean
  date?: boolean
}

export function IndividualData({
  label,
  value,
  password,
  date,
}: IndividualDataProps) {
  const [show, setShow] = useState(false)

  const formattedDate = dayjs(value).locale('pt-br').format('DD/MM/YYYY')

  function showPassword() {
    setShow(!show)
  }

  return (
    <div className="flex w-1/2 flex-col items-center">
      <strong>{label}</strong>
      <p className={`${password ? 'flex items-center gap-4' : null}`}>
        {date ? (
          formattedDate
        ) : password ? (
          <span>{show ? value : '********'}</span>
        ) : (
          value
        )}
        {password && (
          <button type="button" onClick={showPassword}>
            <Eye />
          </button>
        )}
      </p>
    </div>
  )
}
