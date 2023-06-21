'use client'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { useState, FormEvent } from 'react'
import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #27272A',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 24,
  p: 4,
}

interface NewStudentModalProps {
  setOpenModal: any
  modal: boolean
  createStudent: (studentData: {}) => Promise<void>
}

export function NewStudentModal({
  setOpenModal,
  modal,
  createStudent,
}: NewStudentModalProps) {
  const handleClose = () => setOpenModal(false)

  const [studentData, setStudentData] = useState({
    email: '',
    password: '',
    name: '',
    status: '',
    phone: '',
    birthday: '',
    CPF: '',
    RG: '',
    address: '',
    father: '',
    mother: '',
    observations: '',
    registration_day: '',
    registration_number: 0,
    classId: '',
  })
  const handleFieldChange = (fieldName: string, newValue: string | number) => {
    if (fieldName === 'registration_number') {
      newValue = Number(newValue)
    }
    setStudentData((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createStudent(studentData)
    setOpenModal()
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
          <Box sx={style}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) => handleFieldChange('name', value)}
                  label="Nome"
                  value={studentData.name}
                />
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('classId', value)
                  }
                  label="Turma"
                  value={studentData.classId}
                  select
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('email', value)
                  }
                  label="Email"
                  value={studentData.email}
                />
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('password', value)
                  }
                  label="Senha"
                  value={studentData.password}
                  password
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('phone', value)
                  }
                  label="Telefone"
                  value={studentData.phone}
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('birthday', value)
                  }
                  label="Data de Nascimento"
                  value={studentData.birthday}
                  date
                />
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('address', value)
                  }
                  label="Endereço"
                  value={studentData.address}
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) => handleFieldChange('CPF', value)}
                  label="CPF"
                  value={studentData.CPF}
                />
                <IndividualDataForm
                  onChange={(value: string) => handleFieldChange('RG', value)}
                  label="RG"
                  value={studentData.RG}
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('registration_number', value)
                  }
                  label="Núm. de Matrí."
                  value={studentData.registration_number}
                />
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('registration_day', value)
                  }
                  label="Data de Matrí."
                  value={studentData.registration_day}
                  date
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('father', value)
                  }
                  label="Pai"
                  value={studentData.father}
                />
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('mother', value)
                  }
                  label="Mãe"
                  value={studentData.mother}
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <IndividualDataForm
                  onChange={(value: string) =>
                    handleFieldChange('observations', value)
                  }
                  label="Observações"
                  value={studentData.observations}
                  textarea
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
