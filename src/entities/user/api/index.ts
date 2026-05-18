import { api } from '../../../shared/api/instance'
import type { User } from '../model/types'

interface GetUsersParams {
  page: number
  per_page: number
}

export const getUsers = async ({ page, per_page }: GetUsersParams) => {
  const response = await api.get<User[]>('/users', {
    params: { page, per_page },
  })

  const total = parseInt(response.headers['x-pagination-total'] ?? '0', 10)

  return {
    data: response.data,
    total,
  }
}

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}
