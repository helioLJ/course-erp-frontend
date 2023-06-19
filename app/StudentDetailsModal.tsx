/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { useEffect, useState } from 'react'
import { Check, Pencil, Trash, X } from 'lucide-react'
import { Student } from './Students'
import { api } from './lib/api'
import { IndividualData } from './components/IndividualData'
import { IndividualDataForm } from './components/IndividualDataForm'

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

interface StudentDetailsModalProps {
  setOpenModal: any
  modal: boolean
  studentId: string
}

export function StudentDetailsModal({
  setOpenModal,
  modal,
  studentId,
}: StudentDetailsModalProps) {
  const [studentData, setStudentData] = useState<Student>({
    id: '',
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
    class: {
      name: '',
    },
  })
  const [editing, setEditing] = useState(false)
  const handleClose = () => setOpenModal(false)

  async function fetchData() {
    const { data } = await api.get(`/student/${studentId}`)
    setStudentData(data.student)
  }

  async function updateStudent() {
    console.log('confirma e toast de sucesso ou falha')
    await api.put(`/student/${studentId}`, studentData)
    setEditing(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
            <div className="space-y-5">
              <div className="flex justify-between">
                {!editing ? (
                  <button
                    onClick={() => {
                      setEditing(true)
                    }}
                  >
                    <Pencil />
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        updateStudent()
                      }}
                    >
                      <Check className="text-green-500" />
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false)
                      }}
                    >
                      <Trash className="text-red-500" />
                    </button>
                  </div>
                )}

                <button onClick={handleClose}>
                  <X />
                </button>
              </div>

              {/* Student Picture */}
              <div className="text-center">
                <h1 className="text-xl">{studentData.name}</h1>
                <span className="text-zinc-400">{studentData.classId}</span>
              </div>

              {!editing ? (
                <>
                  <div className="flex w-full">
                    <IndividualData label="Email" value={studentData.email} />
                    <IndividualData
                      label="Senha"
                      value={studentData.password}
                      password
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualData label="Status" value="A definir" />
                    <IndividualData
                      label="Telefone"
                      value={studentData.phone}
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualData
                      label="Data de Nascimento"
                      value={studentData.birthday}
                      date
                    />
                    <IndividualData
                      label="Endereço"
                      value={studentData.address}
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualData label="CPF" value={studentData.CPF} />
                    <IndividualData label="RG" value={studentData.RG} />
                  </div>
                  <div className="flex w-full">
                    <IndividualData
                      label="Núm. de Matrí."
                      value={studentData.registration_number}
                    />
                    <IndividualData
                      label="Data de Matrí."
                      value={studentData.registration_day}
                      date
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualData label="Pai" value={studentData.father} />
                    <IndividualData label="Mãe" value={studentData.mother} />
                  </div>
                </>
              ) : (
                <form className="space-y-4">
                  <div className="flex w-full">
                    <IndividualDataForm
                      label="Email"
                      value={studentData.email}
                    />
                    <IndividualDataForm
                      label="Senha"
                      value={studentData.password}
                      password
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualDataForm label="Status" value="A definir" />
                    <IndividualDataForm
                      label="Telefone"
                      value={studentData.phone}
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualDataForm
                      label="Data de Nascimento"
                      value={studentData.birthday}
                      date
                    />
                    <IndividualDataForm
                      label="Endereço"
                      value={studentData.address}
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualDataForm label="CPF" value={studentData.CPF} />
                    <IndividualDataForm label="RG" value={studentData.RG} />
                  </div>
                  <div className="flex w-full">
                    <IndividualDataForm
                      label="Núm. de Matrí."
                      value={studentData.registration_number}
                    />
                    <IndividualDataForm
                      label="Data de Matrí."
                      value={studentData.registration_day}
                      date
                    />
                  </div>
                  <div className="flex w-full">
                    <IndividualDataForm
                      label="Pai"
                      value={studentData.father}
                    />
                    <IndividualDataForm
                      label="Mãe"
                      value={studentData.mother}
                    />
                  </div>
                </form>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
