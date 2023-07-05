'use client'
import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

import { Banknote, Eye, GraduationCap } from 'lucide-react'

import DefaultCell from '../Common/DefaultCell'

interface StudentRowProps {
  name?: string
  className?: string
  phone?: string
  email?: string
  id?: string
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export default function StudentRow({
  name,
  className,
  phone,
  email,
  id,
  setCurrentOpenId,
}: StudentRowProps) {
  // const [status, setStatus] = useState('Em dias')

  return (
    <tr className="mb-4 block border-y-2 border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 dark:text-white lg:table-row">
      <DefaultCell label="Nome">{name}</DefaultCell>
      <DefaultCell label="Turma">{className}</DefaultCell>
      <DefaultCell label="Telefone">{phone}</DefaultCell>
      <DefaultCell label="Email">{email}</DefaultCell>
      <DefaultCell label="Status">
        <p className="rounded-full bg-green-200 px-4 py-1 text-center text-green-500">
          Status
        </p>
      </DefaultCell>
      <DefaultCell label="Detalhes">
        <div className="flex items-center justify-end gap-4 lg:justify-start">
          <button
            onClick={() => {
              setCurrentOpenId(id ?? '')
            }}
          >
            <Eye className="text-green-500" />
          </button>
        </div>
      </DefaultCell>
      <DefaultCell label="Links">
        <div className="flex items-center justify-end gap-4 lg:justify-start">
          <Link href="#">
            <Banknote className="text-zinc-400" />
          </Link>
          <Link href="#">
            <GraduationCap className="text-zinc-400" />
          </Link>
        </div>
      </DefaultCell>
    </tr>
  )
}
