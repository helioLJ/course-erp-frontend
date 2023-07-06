export type GradeType = {
  id?: string
  grade?: number
  frequency?: string
  student?: {
    id?: string
    email?: string
    name?: string
    classId?: string
    className?: string
  }
  subject?: {
    id?: string
    name?: string
  }
}
