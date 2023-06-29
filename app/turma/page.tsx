import { getServerSession } from 'next-auth'
import { authOptions } from '../utils/authOptions'
import ClassAdminPage from '../components/Class/ClassAdminPage'
import SignIn from '../signin/page'
import { redirect } from 'next/navigation'

export default async function Turma() {
  const session = await getServerSession(authOptions)

  if (session?.user.category !== 'administrator') {
    redirect('/')
  }

  return <>{!session ? <SignIn /> : <ClassAdminPage />}</>
}
