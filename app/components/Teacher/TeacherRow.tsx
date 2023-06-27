import { Dispatch, SetStateAction } from 'react'
import { Eye } from 'lucide-react'
import DefaultCell from '../Common/DefaultCell'

interface TeacherRowProps {
  name: string
  phone: string
  email: string
  CPF: string
  RG: string
  id: string
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export default function TeacherRow({
  name,
  phone,
  email,
  id,
  setCurrentOpenId,
  CPF,
  RG,
}: TeacherRowProps) {
  return (
    <tr className="mb-4 block border-y-2 border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 dark:text-white lg:table-row">
      <DefaultCell label="Nome">{name}</DefaultCell>
      <DefaultCell label="Telefone">{phone}</DefaultCell>
      <DefaultCell label="Email">{email}</DefaultCell>
      <DefaultCell label="Email">{CPF}</DefaultCell>
      <DefaultCell label="Email">{RG}</DefaultCell>
      <DefaultCell label="Detalhes">
        <div className="flex items-center justify-end gap-4 lg:justify-start">
          <button
            onClick={() => {
              setCurrentOpenId(id)
            }}
          >
            <Eye className="text-green-500" />
          </button>
        </div>
      </DefaultCell>
    </tr>
  )
}
