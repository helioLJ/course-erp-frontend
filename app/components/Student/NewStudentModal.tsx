import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Button from '../Common/Button'
import { IndividualDataForm } from '../Common/IndividualDataForm'
import { createStudent } from '@/app/utils/student/createStudent'
import { FormModal } from '../Common/FormModal'

interface NewStudentModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  modal: boolean
}

const handleCreateFormSchema = z.object({
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
  birthday: z.union([z.string(), z.coerce.date()]),
  registration_day: z.union([z.string(), z.coerce.date()]),
  registration_number: z.coerce.number(),
  CPF: z.string(),
  RG: z.string(),
  address: z.string(),
  father: z.string(),
  mother: z.string(),
  observations: z.string(),
})

type handleCreateFormData = z.infer<typeof handleCreateFormSchema>

export function NewStudentModal({ setOpenModal, modal }: NewStudentModalProps) {
  const handleClose = () => setOpenModal(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleCreateFormData>({
    resolver: zodResolver(handleCreateFormSchema),
  })

  const createStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['studentsList'])
    },
  })

  function handleCreate(data: handleCreateFormData) {
    createStudentMutation.mutate(data)
    handleClose()
  }

  return (
    <FormModal
      handleClose={handleClose}
      isOpen={modal}
      onSubmit={handleSubmit(handleCreate)}
    >
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
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Data de Nascimento"
          date
          register={register}
          registerName="birthday"
          errors={errors.birthday}
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
      <Button value="Criar Aluno" type="submit" />
    </FormModal>
  )
}
