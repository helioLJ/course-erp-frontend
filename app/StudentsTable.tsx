import StudentRow from './StudentRow'
import { Student } from './Students'
import { api } from './lib/api'

export default async function StudentsTable() {
  const { data } = await api.get('/student')
  return (
    <div className="rounded-lg border-x-2 border-gray-200">
      <table className="block w-full border-collapse overflow-hidden rounded-lg lg:table">
        <thead className="hidden bg-white text-left lg:table-header-group">
          <tr className="border-y-2 border-gray-200 text-lg font-bold text-zinc-400">
            <th className="p-4">Nome</th>
            <th className="p-4">Turma</th>
            <th className="p-4">Telefone</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Detalhes</th>
            <th className="p-4">Links</th>
          </tr>
        </thead>
        <tbody className="block lg:table-row-group">
          {!!data.students &&
            data.students.map((student: Student) => (
              <StudentRow
                key={student.id}
                id={student.id}
                name={student.name}
                className={student.class.name}
                email={student.email}
                phone={student.phone}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}
