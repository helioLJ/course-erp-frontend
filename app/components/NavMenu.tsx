import { User } from 'lucide-react'
import Link from 'next/link'
import ResponsiveMenu from './ResponsiveMenu'

export default function NavMenu() {
  return (
    <header className="mb-9 flex items-center justify-between gap-2">
      <nav className="hidden w-fit overflow-hidden rounded-lg border-2 border-gray-200 lg:block">
        <ul className="flex w-auto flex-wrap gap-4 bg-white px-6 text-zinc-400">
          <li className="flex h-9 items-center px-5 transition-colors hover:text-green-500">
            <Link href="#">Pagamentos</Link>
          </li>
          <li className="flex h-9 items-center px-5 transition-colors hover:text-green-500">
            <Link href="#">Notas</Link>
          </li>
          <li className="flex h-9 items-center px-5 transition-colors hover:text-green-500">
            <Link href="#">Alunos</Link>
          </li>
          <li className="flex h-9 items-center px-5 transition-colors hover:text-green-500">
            <Link href="#">Professores</Link>
          </li>
          <li className="flex h-9 items-center px-5 transition-colors hover:text-green-500">
            <Link href="#">Turmas</Link>
          </li>
          <li className="flex h-9 items-center px-5 transition-colors hover:text-green-500">
            <Link href="#">Disciplinas</Link>
          </li>
        </ul>
      </nav>
      <div className="lg:hidden">
        <ResponsiveMenu />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-800">
            <User />
          </div>
          <p className="font-bold">Administrador</p>
        </div>
        <button className="rounded-md bg-zinc-400 px-6 py-3 font-bold text-white transition-opacity hover:opacity-70">
          Sair
        </button>
      </div>
    </header>
  )
}
