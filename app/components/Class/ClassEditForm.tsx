import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ClassesType } from '@/app/types/classes'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

const handleUpdateFormSchema = z.object({
  name: z
    .string()
    .nonempty('Campo obrigatório.')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  period: z.string(),
  start_day: z.union([
    z.string().nonempty('Campo Obrigatório'),
    z.coerce.date(),
  ]),
  end_day: z.union([z.string().nonempty('Campo Obrigatório'), z.coerce.date()]),
})

type handleUpdateFormData = z.infer<typeof handleUpdateFormSchema>

interface ClassEditFormProps {
  classData: ClassesType
  updateClass: (classData: handleUpdateFormData) => Promise<void>
}

export function ClassEditForm({ classData, updateClass }: ClassEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleUpdateFormData>({
    resolver: zodResolver(handleUpdateFormSchema),
    defaultValues: {
      name: classData.name,
      period: classData.period,
      start_day: dayjs(classData.start_day).format('DD/MM/YYYY'),
      end_day: dayjs(classData.end_day).format('DD/MM/YYYY'),
    },
  })

  function handleUpdate(data: handleUpdateFormData) {
    updateClass(data)
    console.log(data)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Nome"
          mandatory
          register={register}
          registerName="name"
          errors={errors.name}
        />
        <IndividualDataForm
          label="Período"
          mandatory
          register={register}
          registerName="period"
          errors={errors.period}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Início"
          mandatory
          register={register}
          registerName="start_day"
          errors={errors.start_day}
          date
          value={classData.start_day}
        />
        <IndividualDataForm
          label="Término"
          mandatory
          register={register}
          registerName="end_day"
          errors={errors.end_day}
          date
          value={classData.end_day}
        />
      </div>
      <Button value="Atualizar Dados" type="submit" />
    </form>
  )
}
