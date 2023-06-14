interface ButtonProps {
  value: string
  type: 'button' | 'submit' | 'reset' | undefined
}

export default function Button({ value, type }: ButtonProps) {
  return (
    <button
      className="w-full rounded-xl bg-green-500 p-3 font-bold text-white"
      type={type}
    >
      {value}
    </button>
  )
}
