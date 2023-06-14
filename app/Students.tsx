import StudentsTable from './StudentsTable'
import BasicSelect from './components/BasicSelect'
import Button from './components/Button'
import SearchField from './components/SearchField'

export default function Students() {
  return (
    <div className="flex h-full flex-col">
      <div className="self-end">
        <p>
          <strong>Total de alunos:</strong> 25
        </p>
        <p>
          <strong>Pagantes e Pendentes:</strong> 12/13
        </p>
      </div>
      <div className="mb-4 mt-16 flex items-center justify-between gap-5">
        <h1 className="text-5xl">Alunos</h1>
        <div className="w-full max-w-[500px]">
          <SearchField />
        </div>
        <BasicSelect />
        <div className="w-full max-w-[150px]">
          <Button type="button" value="Novo Aluno" />
        </div>
      </div>
      <StudentsTable />
    </div>
  )
}
