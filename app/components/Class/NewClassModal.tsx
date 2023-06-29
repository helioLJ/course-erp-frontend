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

interface NewClassModalProps {
  setOpenModal: any
  modal: boolean
  createClass: (classData: any) => void
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
  period: z.string(),
  start_day: z.union([
    z.string().nonempty('Campo Obrigatório'),
    z.coerce.date(),
  ]),
  end_day: z.union([z.string().nonempty('Campo Obrigatório'), z.coerce.date()]),
})

type handleCreateFormData = z.infer<typeof handleCreateFormSchema>

export function NewClassModal({
  setOpenModal,
  modal,
  createClass,
}: NewClassModalProps) {
  const handleClose = () => setOpenModal(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleCreateFormData>({
    resolver: zodResolver(handleCreateFormSchema),
  })

  function handleCreate(data: handleCreateFormData) {
    createClass(data)
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
                />
                <IndividualDataForm
                  label="Término"
                  mandatory
                  register={register}
                  registerName="end_day"
                  errors={errors.end_day}
                  date
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
