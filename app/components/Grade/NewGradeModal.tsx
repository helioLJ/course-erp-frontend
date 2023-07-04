import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import { IndividualDataForm } from '../Common/IndividualDataForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectStudent } from '../Inputs/SelectStudent'
import { SelectSubject } from '../Inputs/SelectSubject'
import { InputNumber } from '../Inputs/InputNumber'

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

interface NewGradeModalProps {
  setOpenModal: any
  modalBoolean: boolean
  createGrade: (gradeData: any) => void
}

const handleCreateFormSchema = z.object({
  grade: z.coerce.number(),
  frequency: z.string().nonempty('Campo obrigatório.'),
  studentId: z.string().nonempty('Campo obrigatório.'),
  subjectId: z.string().nonempty('Campo obrigatório.'),
})

type handleCreateFormData = z.infer<typeof handleCreateFormSchema>

export function NewGradeModal({
  setOpenModal,
  modalBoolean,
  createGrade,
}: NewGradeModalProps) {
  const handleClose = () => setOpenModal(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleCreateFormData>({
    resolver: zodResolver(handleCreateFormSchema),
  })

  function handleCreate(data: handleCreateFormData) {
    createGrade(data)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalBoolean}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalBoolean}>
          <Box sx={style} className="dark:bg-zinc-800">
            <form className="space-y-4" onSubmit={handleSubmit(handleCreate)}>
              <div className="flex w-full justify-between gap-4">
                <SelectStudent
                  label="Aluno"
                  register={register}
                  registerName="studentId"
                />
                <SelectSubject
                  label="Disciplina"
                  register={register}
                  registerName="subjectId"
                />
                {/* errors={errors.grade} */}
              </div>
              <div className="flex w-full justify-between gap-4">
                <InputNumber
                  label="Nota"
                  register={register}
                  registerName="grade"
                />
                <IndividualDataForm
                  label="Frequência"
                  mandatory
                  register={register}
                  registerName="frequency"
                  errors={errors.frequency}
                />
              </div>
              <Button value="Cadastrar Nota" type="submit" />
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
