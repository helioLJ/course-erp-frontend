import { Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface SearchFieldProps {
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

export default function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="relative rounded-md border-2 border-gray-200 bg-white">
      <input
        className="block h-full w-full rounded-md px-11 py-3"
        type="text"
        placeholder="Pesquisar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute bottom-2.5 left-2 text-zinc-400" />
    </div>
  )
}
