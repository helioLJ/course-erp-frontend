import Login from './Login'
import Students from './Students'

export default function Home() {
  const isLogged = true

  return isLogged ? <Students /> : <Login />
}
