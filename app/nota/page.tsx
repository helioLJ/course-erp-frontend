import { getServerSession } from 'next-auth'
import { authOptions } from '../utils/authOptions'
import SignIn from '../signin/page'
import { redirect } from 'next/navigation'
import GradesAdminPage from '../components/Grade/GradesAdminPage'

export default async function Nota() {
  const session = await getServerSession(authOptions)

  if (session?.user.category !== 'administrator') {
    redirect('/')
  }

  return <>{!session ? <SignIn /> : <GradesAdminPage />}</>
}
