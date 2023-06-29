import { getServerSession } from 'next-auth'
import { authOptions } from '../utils/authOptions'
import SignIn from '../signin/page'
import { redirect } from 'next/navigation'
import SubjectAdminPage from '../components/Subject/SubjectAdminPage'

export default async function Disciplina() {
  const session = await getServerSession(authOptions)

  if (session?.user.category !== 'administrator') {
    redirect('/')
  }

  return <>{!session ? <SignIn /> : <SubjectAdminPage />}</>
}
