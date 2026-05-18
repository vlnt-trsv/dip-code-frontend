import { api } from '../../../shared/api/instance'
import type { Post, Comment } from '../model/types'

interface GetPostsParams {
  page: number
  per_page: number
}

export const getPosts = async ({ page, per_page }: GetPostsParams) => {
  const response = await api.get<Post[]>('/posts', {
    params: { page, per_page },
  })

  const total = parseInt(response.headers['x-pagination-total'] ?? '0', 10)

  return {
    data: response.data,
    total,
  }
}

export const getPostById = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`)
  return response.data
}

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`)
  return response.data
}
