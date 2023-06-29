import { IndividualDataForm } from '../Common/IndividualDataForm'
import Button from '../Common/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GradeType } from '@/app/types/grade'

const handleUpdateFormSchema = z.object({
  grade: z.number(),
  frequency: z.string().nonempty('Campo obrigatório.'),
  studentId: z.string().nonempty('Campo obrigatório.'),
  subjectId: z.string().nonempty('Campo obrigatório.'),
})

type handleUpdateFormData = z.infer<typeof handleUpdateFormSchema>

interface GradeEditFormProps {
  gradeData: GradeType
  updateGrade: (gradeData: handleUpdateFormData) => Promise<void>
}

export function GradeEditForm({ gradeData, updateGrade }: GradeEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleUpdateFormData>({
    resolver: zodResolver(handleUpdateFormSchema),
    defaultValues: {
      grade: gradeData.grade,
      frequency: gradeData.frequency,
      studentId: gradeData.student.id,
      subjectId: gradeData.subject.id,
    },
  })

  function handleUpdate(data: handleUpdateFormData) {
    updateGrade(data)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Aluno"
          mandatory
          register={register}
          registerName="studentId"
          errors={errors.studentId}
          selectStatus
        />
        <IndividualDataForm
          label="Disciplina"
          mandatory
          register={register}
          registerName="subjectId"
          errors={errors.subjectId}
          selectStatus
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <IndividualDataForm
          label="Nota"
          mandatory
          register={register}
          registerName="grade"
          errors={errors.grade}
          // number
        />
        <IndividualDataForm
          label="Frequência"
          mandatory
          register={register}
          registerName="frequency"
          errors={errors.frequency}
        />
      </div>
      <Button value="Atualizar Dados" type="submit" />
    </form>
  )
}
