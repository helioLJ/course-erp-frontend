'use client'
import { FormEvent, useState } from 'react'
import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'
import { StudentBody } from '@/app/types/studentBody'

interface StudentEditFormProps {
  studentData: StudentBody
  updateStudent: (studentData: StudentBody) => Promise<void>
}

export function StudentEditForm({
  studentData,
  updateStudent,
}: StudentEditFormProps) {
  const [newStudentData, setNewStudentData] = useState<StudentBody>({
    email: studentData.email,
    password: studentData.password,
    name: studentData.name,
    status: studentData.status,
    phone: studentData.phone,
    birthday: studentData.birthday,
    CPF: studentData.CPF,
    RG: studentData.RG,
    address: studentData.address,
    father: studentData.father,
    mother: studentData.mother,
    observations: studentData.observations,
    registration_day: studentData.registration_day,
    registration_number: studentData.registration_number,
    classId: studentData.classId,
  })

  const handleFieldChange = (fieldName: string, newValue: string | number) => {
    if (fieldName === 'registration_number') {
      newValue = Number(newValue)
    }
    setNewStudentData((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateStudent(newStudentData)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('name', value)}
          label="Nome"
          value={newStudentData.name}
        />
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('classId', value)}
          label="Turma"
          value={newStudentData.classId}
          select
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('email', value)}
          label="Email"
          value={newStudentData.email}
        />
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('password', value)}
          label="Senha"
          value={newStudentData.password}
          password
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('phone', value)}
          label="Telefone"
          value={newStudentData.phone}
        />
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('status', value)}
          label="Status"
          value={studentData.status}
          selectStatus
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('birthday', value)}
          label="Data de Nascimento"
          value={newStudentData.birthday}
          date
        />
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('address', value)}
          label="Endereço"
          value={newStudentData.address}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('CPF', value)}
          label="CPF"
          value={newStudentData.CPF}
        />
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('RG', value)}
          label="RG"
          value={newStudentData.RG}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) =>
            handleFieldChange('registration_number', value)
          }
          label="Núm. de Matrí."
          value={newStudentData.registration_number}
        />
        <IndividualDataForm
          onChange={(value: string) =>
            handleFieldChange('registration_day', value)
          }
          label="Data de Matrí."
          value={newStudentData.registration_day}
          date
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('father', value)}
          label="Pai"
          value={newStudentData.father}
        />
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('mother', value)}
          label="Mãe"
          value={newStudentData.mother}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          onChange={(value: string) => handleFieldChange('observations', value)}
          label="Observações"
          value={studentData.observations}
          textarea
        />
      </div>
      <Button value="Atualizar Dados" type="submit" />
    </form>
  )
}
