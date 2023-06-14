interface DefaultCellProps {
  label: string
  children: any
}

export default function DefaultCell({ label, children }: DefaultCellProps) {
  return (
    <td
      className="relative block w-full p-4 pl-[50%] text-right before:absolute before:left-0 before:w-1/2 before:pl-4  before:text-left before:font-bold before:text-zinc-400 before:content-[attr(data-label)] lg:static lg:table-cell lg:w-auto lg:pl-4 lg:text-left lg:before:content-none"
      data-label={label}
    >
      {children}
    </td>
  )
}
