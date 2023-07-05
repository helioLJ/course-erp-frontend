export interface StudentType {
  id?: string
  email?: string
  password?: string
  name?: string
  status?: string
  phone?: string
  birthday?: string | Date
  CPF?: string
  RG?: string
  address?: string
  father?: string
  mother?: string
  observations?: string
  registration_number?: number
  registration_day?: string | Date
  classId?: string
  class?: {
    name?: string
  }
  status?: string
}
