import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import encode from 'jwt-decode'
import { api } from '../lib/api'
import { cookies } from 'next/headers'

interface User {
  name: string
  token: string
  id: string
  category: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3333/auth', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()
        const token = data.token
        const user: any = encode(token)

        api.defaults.headers.common.Authorization = `Bearer ${token}`

        cookies().set({
          name: 'trilogia_token',
          value: token,
        })

        if (res.ok && user) {
          return {
            id: user.sub,
            name: user.name,
            category: user.category,
            token,
          }
        }
        return null
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  pages: {
    signIn: '/signin',
  },
}
