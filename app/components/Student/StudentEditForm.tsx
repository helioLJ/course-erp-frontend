import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'
import { StudentBody } from '@/app/types/studentBody'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  classId: z.string().nonempty('Campo obrigatório.'),
  email: z.string().email('Email inválido.').nonempty('Campo obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres.')
    .nonempty('Campo obrigatório.'),
  phone: z.string(),
  birthday: z.union([
    z.string().transform((str) => new Date(str)),
    z.coerce.date(),
  ]),
  registration_day: z.union([
    z.string().transform((str) => new Date(str)),
    z.coerce.date(),
  ]),
  registration_number: z.coerce.number(),
  CPF: z.string(),
  RG: z.string(),
  address: z.string(),
  father: z.string(),
  mother: z.string(),
  observations: z.string(),
  status: z.string(),
})

type handleUpdateFormData = z.infer<typeof handleUpdateFormSchema>

interface StudentEditFormProps {
  studentData: StudentBody
  updateStudent: (studentData: handleUpdateFormData) => Promise<void>
}

export function StudentEditForm({
  studentData,
  updateStudent,
}: StudentEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleUpdateFormData>({
    resolver: zodResolver(handleUpdateFormSchema),
    defaultValues: {
      name: studentData.name,
      classId: studentData.classId,
      email: studentData.email,
      password: studentData.password,
      status: studentData.status,
      phone: studentData.phone,
      address: studentData.address,
      CPF: studentData.CPF,
      RG: studentData.RG,
      registration_number: studentData.registration_number,
      father: studentData.father,
      mother: studentData.mother,
      observations: studentData.observations,
    },
  })

  const studentBirthday = studentData.birthday && new Date(studentData.birthday)
  const studentRegistrationDay =
    studentData.registration_day && new Date(studentData.registration_day)

  function handleUpdate(data: handleUpdateFormData) {
    updateStudent(data)
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
          label="Turma"
          select
          mandatory
          register={register}
          registerName="classId"
          errors={errors.classId}
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
        <IndividualDataForm
          label="Status"
          register={register}
          registerName="status"
          value={studentData.status}
          selectStatus
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          value={studentBirthday}
          label="Data de Nascimento"
          date
          register={register}
          registerName="birthday"
        />
        <IndividualDataForm
          label="Endereço"
          register={register}
          registerName="address"
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
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Núm. de Matrí."
          register={register}
          registerName="registration_number"
          type="number"
        />
        <IndividualDataForm
          value={studentRegistrationDay}
          label="Data de Matrí."
          date
          register={register}
          registerName="registration_day"
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Pai"
          register={register}
          registerName="father"
        />
        <IndividualDataForm
          label="Mãe"
          register={register}
          registerName="mother"
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Observações"
          textarea
          register={register}
          registerName="observations"
        />
      </div>
      <Button value="Atualizar Dados" type="submit" />
    </form>
  )
}
