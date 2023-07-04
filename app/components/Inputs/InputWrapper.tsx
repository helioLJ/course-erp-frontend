import { ReactNode } from 'react'

interface InputWrapperProps {
  label: string
  mandatory?: boolean
  password?: boolean
  children: ReactNode
}

export function InputWrapper({
  label,
  mandatory,
  password,
  children,
}: InputWrapperProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <strong>
        {label}
        {mandatory && <span className="text-red-500">*</span>}
      </strong>
      <div
        className={`${
          password
            ? 'flex h-full w-full items-center gap-4'
            : 'flex h-full w-full'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
