import Students from './Students'
import { getServerSession } from 'next-auth'
import { authOptions } from './utils/authOptions'
import SignIn from './signin/page'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return <>{session ? <Students /> : <SignIn />}</>
}
