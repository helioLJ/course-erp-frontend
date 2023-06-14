'use client'
import { ChevronsLeftRight, Command, Sheet } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Logo from '../../public/logotrilogia.png'
import Image from 'next/image'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  function toggleSidebar() {
    setIsOpen(!isOpen)
  }

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div
      className={`${
        !isOpen ? '-translate-x-60' : null
      } absolute left-0 top-0 z-50 flex h-full w-64 flex-col justify-between rounded-e-2xl border-2 border-gray-200 bg-white text-center transition-transform`}
    >
      <div className="relative flex w-full justify-center border-b-2 border-gray-200 bg-gray-100 py-6">
        <Image className="w-10" src={Logo} alt="Logo do Trilogia" />
        <button
          onClick={toggleSidebar}
          className="absolute -bottom-6 -right-6 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-200 bg-white"
        >
          <ChevronsLeftRight />
        </button>
      </div>

      <div className="flex h-full w-full flex-col gap-4 py-6">
        <Link href="#" className="flex justify-center gap-3 font-bold">
          <Command />
          <p>Dashboard</p>
        </Link>
        <Link href="#" className="flex justify-center gap-3 text-zinc-400">
          <Sheet />
          <p>Fichas</p>
        </Link>
      </div>

      <div className="w-full border-t-2 border-gray-200 bg-gray-100 py-6">
        <button
          onClick={toggleTheme}
          className="h-8 w-14 rounded-full bg-gray-200 px-0.5"
        >
          <div
            className={`${
              theme === 'light' ? 'translate-x-0' : 'translate-x-6'
            } h-7 w-7 rounded-full bg-white shadow-2xl transition-transform`}
          ></div>
        </button>
      </div>
    </div>
  )
}
