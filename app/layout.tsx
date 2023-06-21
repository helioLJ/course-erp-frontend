import { ReactNode } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'
import Hud from './components/Common/Hud'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Portal Trilogia',
  description: '',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} overflow-x-hidden bg-gray-100 px-7 py-7 font-sans text-zinc-800 transition-colors dark:bg-zinc-800 dark:text-white md:px-28`}
      >
        <NextAuthSessionProvider>
          {/* @ts-expect-error Aysnc Component */}
          <Hud />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
