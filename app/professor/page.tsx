import { getServerSession } from 'next-auth'
import { authOptions } from '../utils/authOptions'
import TeachersAdminPage from '../components/Teacher/TeachersAdminPage'
import SignIn from '../signin/page'

export default async function Professor() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {!session ? (
        <SignIn />
      ) : session.user.category === 'administrator' ? (
        <TeachersAdminPage />
      ) : session.user.category === 'teacher' ? (
        <p>Eae</p>
      ) : (
        <p>Eae</p>
      )}
    </>
  )
}
