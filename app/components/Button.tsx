interface ButtonProps {
  value: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

export default function Button({ value, type, onClick }: ButtonProps) {
  return (
    <button
      className="w-full rounded-xl bg-green-500 p-3 font-bold text-white"
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
