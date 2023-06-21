import { getServerSession } from 'next-auth'
import { authOptions } from './utils/authOptions'

import Students from './components/Student/Students'
import SignIn from './signin/page'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return <>{session ? <Students /> : <SignIn />}</>
}
