import { getServerSession } from 'next-auth'
import { authOptions } from './utils/authOptions'

import SignIn from './signin/page'
import StudentsAdminPage from './components/Student/StudentsAdminPage'
import { StudentsPage } from './components/Student/StudentsPage'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      {!session ? (
        <SignIn />
      ) : session.user.category === 'administrator' ? (
        <StudentsAdminPage />
      ) : session.user.category === 'student' ? (
        <StudentsPage />
      ) : (
        <p>Eae</p>
      )}
    </>
  )
}
