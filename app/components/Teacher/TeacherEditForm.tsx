import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TeacherType } from '@/app/types/teacher'

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
  email: z.string().email('Email inválido.').nonempty('Campo obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres.')
    .nonempty('Campo obrigatório.'),
  phone: z.string(),
  CPF: z.string(),
  RG: z.string(),
})

type handleUpdateFormData = z.infer<typeof handleUpdateFormSchema>

interface TeacherEditFormProps {
  teacherData: TeacherType
  updateTeacher: (teacherData: handleUpdateFormData) => Promise<void>
}

export function TeacherEditForm({
  teacherData,
  updateTeacher,
}: TeacherEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleUpdateFormData>({
    resolver: zodResolver(handleUpdateFormSchema),
    defaultValues: {
      name: teacherData.name,
      email: teacherData.email,
      password: teacherData.password,
      phone: teacherData.phone,
      CPF: teacherData.CPF,
      RG: teacherData.RG,
    },
  })

  function handleUpdate(data: handleUpdateFormData) {
    updateTeacher(data)
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
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Email"
          mandatory
          register={register}
          registerName="email"
          errors={errors.email}
        />
        <IndividualDataForm
          label="Senha"
          password
          mandatory
          register={register}
          registerName="password"
          errors={errors.password}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Telefone"
          register={register}
          registerName="phone"
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="CPF"
          register={register}
          registerName="CPF"
        />
        <IndividualDataForm label="RG" register={register} registerName="RG" />
      </div>
      <Button value="Atualizar Dados" type="submit" />
    </form>
  )
}
