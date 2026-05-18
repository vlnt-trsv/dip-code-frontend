import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Table } from '@consta/uikit/Table'
import { Text } from '@consta/uikit/Text'
import { Loader } from '@consta/uikit/Loader'
import { getUsers } from '../../entities/user/api'
import { usePagination } from '../../shared/hooks/usePagination'
import { PaginationWidget } from '../../widgets/Pagination'

const columns = [
  { title: 'Имя', accessor: 'firstName' as const },
  { title: 'Фамилия', accessor: 'lastName' as const },
  { title: 'Email', accessor: 'email' as const },
]

export const UsersPage = () => {
  const navigate = useNavigate()
  const { page, perPage, setPage, setPerPage } = usePagination()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page, perPage],
    queryFn: () => getUsers({ page, per_page: perPage }),
  })

  const rows = (data?.data ?? []).map((user) => {
    const [firstName, ...rest] = user.name.split(' ')
    return {
      id: String(user.id),
      firstName,
      lastName: rest.join(' ') || '—',
      email: user.email,
    }
  })

  if (isLoading) return <Loader style={{ margin: '80px auto' }} />
  if (isError) return <Text view="alert">Ошибка загрузки. Проверьте токен.</Text>

  return (
    <div style={{ padding: '32px 40px' }}>
      <Text size="2xl" weight="bold" style={{ marginBottom: 24 }}>
        Пользователи
      </Text>

      <Table
        columns={columns}
        rows={rows}
        onRowClick={({ id }) => navigate(`/users/${id}`)}
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
