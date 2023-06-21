interface DefaultTitleProps {
  title: string
}

export function DefaultTitle({ title }: DefaultTitleProps) {
  return <h1 className="text-5xl font-semibold">{title}</h1>
}
