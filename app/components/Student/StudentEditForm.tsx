'use client'
import { StudentType } from '../../types/student'
import { FormEvent, useState } from 'react'
import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'

interface StudentEditFormProps {
  studentData: StudentType
  updateStudent: (studentData: StudentType) => Promise<void>
}

export function StudentEditForm({
  studentData,
  updateStudent,
}: StudentEditFormProps) {
  const [newStudentData, setNewStudentData] = useState<StudentType>(studentData)

  const handleFieldChange = (fieldName: string, newValue: string) => {
    setNewStudentData((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }))
    console.log(studentData)
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
          select={{
            name: newStudentData.class.name,
            id: newStudentData.classId,
          }}
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
