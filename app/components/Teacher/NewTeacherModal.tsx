import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import { IndividualDataForm } from '../Common/IndividualDataForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '1px solid #27272A',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 24,
  p: 4,
}

interface NewTeacherModalProps {
  setOpenModal: any
  modal: boolean
  createTeacher: (teacherData: any) => void
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
  email: z.string().email('Email inválido.').nonempty('Campo obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres.')
    .nonempty('Campo obrigatório.'),
  phone: z.string(),
  CPF: z.string(),
  RG: z.string(),
})

type handleCreateFormData = z.infer<typeof handleCreateFormSchema>

export function NewTeacherModal({
  setOpenModal,
  modal,
  createTeacher,
}: NewTeacherModalProps) {
  const handleClose = () => setOpenModal(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleCreateFormData>({
    resolver: zodResolver(handleCreateFormSchema),
  })

  function handleCreate(data: handleCreateFormData) {
    createTeacher(data)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modal}>
          <Box sx={style} className="dark:bg-zinc-800">
            <form className="space-y-4" onSubmit={handleSubmit(handleCreate)}>
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
                <IndividualDataForm
                  label="RG"
                  register={register}
                  registerName="RG"
                />
              </div>
              <Button value="Criar Aluno" type="submit" />
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
