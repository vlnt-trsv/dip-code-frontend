import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Table } from '@consta/uikit/Table'
import { Text } from '@consta/uikit/Text'
import { Loader } from '@consta/uikit/Loader'
import { getPosts } from '../../entities/post/api'
import { usePagination } from '../../shared/hooks/usePagination'
import { PaginationWidget } from '../../widgets/Pagination'

const columns = [
  { title: 'ID', accessor: 'id' as const },
  { title: 'Заголовок', accessor: 'title' as const },
]

export const PostsPage = () => {
  const navigate = useNavigate()
  const { page, perPage, setPage, setPerPage } = usePagination()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: () => getPosts({ page, per_page: perPage }),
  })

  const rows = (data?.data ?? []).map((post) => ({
    id: String(post.id),
    title: post.title,
  }))

  if (isLoading) return <Loader />
  if (isError) return <Text view="alert">Ошибка загрузки. Проверьте токен.</Text>

  return (
    <div style={{ padding: '32px 40px' }}>
      <Text size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        Посты
      </Text>

      <Table
        columns={columns}
        rows={rows}
        onRowClick={({ id }) => navigate(`/posts/${id}`)}
      />

      <PaginationWidget
        total={data?.total ?? 0}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </div>
  )
}
