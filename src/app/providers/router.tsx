import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { UsersPage } from '../../pages/UsersPage'
import { PostsPage } from '../../pages/PostsPage'
import { UserCardPage } from '../../pages/UserCardPage'
import { PostCardPage } from '../../pages/PostCardPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  },
  {
    path: '/users/:id',
    element: <UserCardPage />,
  },
  {
    path: '/posts',
    element: <PostsPage />,
  },
  {
    path: '/posts/:id',
    element: <PostCardPage />,
  },
])
