import { Dispatch, SetStateAction } from 'react'
import { Eye } from 'lucide-react'
import DefaultCell from '../Common/DefaultCell'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

interface ClassRowProps {
  name: string
  start_day: Date
  end_day: Date
  period: string
  id: string
  setCurrentOpenId: Dispatch<SetStateAction<string>>
}

export default function ClassRow({
  name,
  start_day,
  end_day,
  period,
  id,
  setCurrentOpenId,
}: ClassRowProps) {
  const now = new Date()
  const finished = end_day > now

  return (
    <tr className="mb-4 block border-y-2 border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 dark:text-white lg:table-row">
      <DefaultCell label="Nome">{name}</DefaultCell>
      <DefaultCell label="Início">
        {dayjs(start_day).format('DD/MM/YYYY')}
      </DefaultCell>
      <DefaultCell label="Término">
        {dayjs(end_day).format('DD/MM/YYYY')}
      </DefaultCell>
      <DefaultCell label="Período">{period}</DefaultCell>
      <DefaultCell label="Status">
        {finished ? 'Terminou' : 'Em andamento'}
      </DefaultCell>
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
