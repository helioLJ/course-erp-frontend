import { Banknote, Eye, GraduationCap, Pencil } from 'lucide-react'
import DefaultCell from './components/DefaultCell'
import Link from 'next/link'

interface StudentRowProps {
  name: string
  className: string
  phone: string
  email: string
  // status: string
  // id: string
}

export default function StudentRow({
  name,
  className,
  phone,
  email,
}: StudentRowProps) {
  return (
    <tr className="mb-4 block border-y-2 border-gray-200 bg-white dark:text-zinc-800 lg:table-row">
      <DefaultCell label="Nome">{name}</DefaultCell>
      <DefaultCell label="Turma">{className}</DefaultCell>
      <DefaultCell label="Telefone">{phone}</DefaultCell>
      <DefaultCell label="Email">{email}</DefaultCell>
      <DefaultCell label="Status">
        <p className="rounded-full bg-green-200 px-4 py-1 text-center text-green-500">
          Em dias
        </p>
      </DefaultCell>
      <DefaultCell label="Operações">
        <div className="flex items-center justify-end gap-4 lg:justify-start">
          <button>
            <Eye className="text-green-500" />
          </button>
          <button>
            <Pencil className="text-green-500" />
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
