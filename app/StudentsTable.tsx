import { Banknote, Eye, GraduationCap, Pencil } from 'lucide-react'
import DefaultCell from './components/DefaultCell'
import Link from 'next/link'

export default function StudentsTable() {
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
            <th className="p-4">Operações</th>
            <th className="p-4">Links</th>
          </tr>
        </thead>
        <tbody className="block lg:table-row-group">
          <tr className="mb-4 block border-y-2 border-gray-200 bg-white lg:table-row">
            <DefaultCell label="Nome">George Lindelof</DefaultCell>
            <DefaultCell label="Turma">Turma 5</DefaultCell>
            <DefaultCell label="Telefon">(91) 98334-3443</DefaultCell>
            <DefaultCell label="Email">example@email.com</DefaultCell>
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
          <tr className="mb-4 block border-y-2 border-gray-200 bg-white lg:table-row">
            <DefaultCell label="Nome">George Lindelof</DefaultCell>
            <DefaultCell label="Turma">Turma 5</DefaultCell>
            <DefaultCell label="Telefon">(91) 98334-3443</DefaultCell>
            <DefaultCell label="Email">example@email.com</DefaultCell>
            <DefaultCell label="Status">
              <p className="rounded-full bg-red-200 px-4 py-1 text-center text-red-500">
                Pendente
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
        </tbody>
      </table>
    </div>
  )
}
