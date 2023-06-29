import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubjectType } from '@/app/types/subject'

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
})

type handleUpdateFormData = z.infer<typeof handleUpdateFormSchema>

interface SubjectEditFormProps {
  subjectData: SubjectType
  updateSubject: (subjectData: handleUpdateFormData) => Promise<void>
}

export function SubjectEditForm({
  subjectData,
  updateSubject,
}: SubjectEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleUpdateFormData>({
    resolver: zodResolver(handleUpdateFormSchema),
    defaultValues: {
      name: subjectData.name,
    },
  })

  function handleUpdate(data: handleUpdateFormData) {
    updateSubject(data)
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
      </div>
      <Button value="Atualizar Dados" type="submit" />
    </form>
  )
}
