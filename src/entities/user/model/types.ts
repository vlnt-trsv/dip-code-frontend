export interface User {
  id: number
  name: string
  email: string
  gender: 'male' | 'female'
  status: 'active' | 'inactive'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
}
