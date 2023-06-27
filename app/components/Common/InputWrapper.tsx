interface InputWrapperProps {
  label: string
  placeholder: string
  type: string
  value: string
  onChange: any
}

export default function InputWrapper({
  label,
  placeholder,
  type,
  value,
  onChange,
}: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={label}>{label}</label>
      <input
        className="rounded-xl border-2 border-gray-200 bg-gray-100 p-3 placeholder:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-700"
        placeholder={placeholder}
        name={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
