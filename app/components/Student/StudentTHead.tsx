export function StudentTHead() {
  return (
    <thead className="hidden bg-white text-left dark:bg-zinc-800 lg:table-header-group">
      <tr className="border-y-2 border-gray-200 text-lg font-bold text-zinc-400 dark:border-zinc-600">
        <th className="p-4">Nome</th>
        <th className="p-4">Turma</th>
        <th className="p-4">Telefone</th>
        <th className="p-4">Email</th>
        <th className="p-4">Status</th>
        <th className="p-4">Detalhes</th>
        <th className="p-4">Links</th>
      </tr>
    </thead>
  )
}
