'use client'
import Button from '@/app/components/Button'
import InputWrapper from '@/app/components/InputWrapper'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await signIn('credentials', {
      email,
      password,
    })
  }

  return (
    <div className="grid h-screen place-items-center p-2">
      <main className="w-full max-w-md space-y-12 text-center">
        <div>
          {/* <Image alt="" /> */}
          <h1 className="text-4xl font-extrabold">LOGO</h1>
          <h1 className="text-2xl font-extralight">Portal Trilogia</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-xl bg-white p-10"
        >
          <div className="space-y-3">
            <InputWrapper
              label="Email"
              placeholder="example@email.com"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <InputWrapper
              label="Senha"
              placeholder="********"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
          <Button value="Fazer Login" type="submit" />
        </form>
      </main>
    </div>
  )
}
