import { UseFormRegister } from 'react-hook-form'
import { InputWrapper } from './InputWrapper'

interface InputNumberProps {
  label: string
  register: UseFormRegister<any>
  registerName: string
}

export function InputNumber({
  label,
  register,
  registerName,
}: InputNumberProps) {
  return (
    <InputWrapper mandatory label={label}>
      <input
        className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
        type="number"
        {...register(`${registerName}`)}
      />
    </InputWrapper>
  )
}
