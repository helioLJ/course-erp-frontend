export function TeacherTHead() {
  return (
    <thead className="hidden bg-white text-left dark:bg-zinc-800 lg:table-header-group">
      <tr className="border-y-2 border-gray-200 text-lg font-bold text-zinc-400 dark:border-zinc-600">
        <th className="p-4">Nome</th>
        <th className="p-4">Telefone</th>
        <th className="p-4">Email</th>
        <th className="p-4">CPF</th>
        <th className="p-4">RG</th>
        <th className="p-4">Detalhes</th>
      </tr>
    </thead>
  )
}
