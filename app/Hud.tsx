import { getServerSession } from 'next-auth'
import NavMenu from './components/NavMenu'
import Sidebar from './components/Sidebar'
import { authOptions } from './utils/authOptions'

export default async function Hud() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session ? <NavMenu /> : null}
      {session ? <Sidebar /> : null}
    </>
  )
}
