import { authOptions } from '@/app/utils/authOptions'
import { getServerSession } from 'next-auth'
import NavMenu from './NavMenu'
import Sidebar from './Sidebar'

export default async function Hud() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session ? <NavMenu /> : null}
      {session ? <Sidebar /> : null}
    </>
  )
}
