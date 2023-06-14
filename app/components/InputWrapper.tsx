interface InputWrapperProps {
  label: string
  placeholder: string
  type: string
}

export default function InputWrapper({
  label,
  placeholder,
  type,
}: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={label}>{label}</label>
      <input
        className="rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400"
        placeholder={placeholder}
        name={label}
        type={type}
      />
    </div>
  )
}
