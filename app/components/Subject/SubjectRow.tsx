import { Dispatch, SetStateAction } from 'react'
import { Eye } from 'lucide-react'
import DefaultCell from '../Common/DefaultCell'

interface SubjectRowProps {
  name: string
  id: string
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export default function SubjectRow({
  name,
  id,
  setCurrentOpenId,
}: SubjectRowProps) {
  return (
    <tr className="mb-4 block border-y-2 border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 dark:text-white lg:table-row">
      <DefaultCell label="Nome">{name}</DefaultCell>
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
