import Button from './components/Button'
import InputWrapper from './components/InputWrapper'

export default function Login() {
  return (
    <div className="grid h-screen place-items-center p-2">
      <main className="w-full max-w-md space-y-12 text-center">
        <div>
          {/* <Image alt="" /> */}
          <h1 className="text-4xl font-extrabold">LOGO</h1>
          <h1 className="text-2xl font-extralight">Portal Trilogia</h1>
        </div>

        <form className="space-y-8 rounded-xl bg-white p-10">
          <div className="space-y-3">
            <InputWrapper
              label="Email"
              placeholder="example@email.com"
              type="email"
            />
            <InputWrapper
              label="Senha"
              placeholder="********"
              type="password"
            />
          </div>
          <Button value="Fazer Login" type="submit" />
        </form>
      </main>
    </div>
  )
}
