'use client'
import { User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ResponsiveMenu from './ResponsiveMenu'
import { signOut, useSession } from 'next-auth/react'

export default function NavMenu() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <header className="absolute left-0 right-0 top-0 flex items-center justify-between gap-2 border-b-2 border-gray-200 bg-white px-7 py-4 dark:border-zinc-600 dark:bg-zinc-800 md:px-28">
      <nav className="hidden w-fit overflow-hidden lg:block">
        <ul className="flex w-auto flex-wrap gap-4 px-6 text-zinc-400">
          <li
            className={`${
              pathname === '/' &&
              'border-b-2 border-green-500 font-bold text-zinc-800 dark:text-white'
            } flex h-9 items-center px-5 transition-colors hover:text-green-500`}
          >
            <Link href="/">Alunos</Link>
          </li>
          <li
            className={`${
              pathname === '/pagamento' &&
              'border-b-2 border-green-500 font-bold text-zinc-800 dark:text-white'
            } flex h-9 items-center px-5 transition-colors hover:text-green-500`}
          >
            <Link href="pagamento">Pagamentos</Link>
          </li>
          <li
            className={`${
              pathname === '/nota' &&
              'border-b-2 border-green-500 font-bold text-zinc-800 dark:text-white'
            } flex h-9 items-center px-5 transition-colors hover:text-green-500`}
          >
            <Link href="nota">Notas</Link>
          </li>
          <li
            className={`${
              pathname === '/professor' &&
              'border-b-2 border-green-500 font-bold text-zinc-800 dark:text-white'
            } flex h-9 items-center px-5 transition-colors hover:text-green-500`}
          >
            <Link href="professor">Professores</Link>
          </li>
          <li
            className={`${
              pathname === '/turma' &&
              'border-b-2 border-green-500 font-bold text-zinc-800 dark:text-white'
            } flex h-9 items-center px-5 transition-colors hover:text-green-500`}
          >
            <Link href="turma">Turmas</Link>
          </li>
          <li
            className={`${
              pathname === '/disciplina' &&
              'border-b-2 border-green-500 font-bold text-zinc-800 dark:text-white'
            } flex h-9 items-center px-5 transition-colors hover:text-green-500`}
          >
            <Link href="disciplina">Disciplinas</Link>
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
          <p className="font-bold">{session?.user?.name}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-md bg-zinc-400 px-6 py-3 font-bold text-white transition-opacity hover:opacity-70"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
