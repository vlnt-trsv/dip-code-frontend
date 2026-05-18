import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'
import { Loader } from '@consta/uikit/Loader'
import { Card } from '@consta/uikit/Card'
import { IconArrowLeft } from '@consta/icons/IconArrowLeft'
import { getUserById } from '../../entities/user/api'

export const UserCardPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(Number(id)),
    enabled: !!id,
  })

  if (isLoading) return <Loader style={{ margin: '80px auto' }} />

  return (
    <div style={{ padding: '32px 40px', maxWidth: 640 }}>
      <Button
        label="Назад"
        view="ghost"
        iconLeft={IconArrowLeft}
        onClick={() => navigate('/users')}
        style={{ marginBottom: 24 }}
      />

      <Card style={{ padding: 32 }}>
        <Text size="2xl" weight="bold" style={{ marginBottom: 16 }}>
          {user?.name}
        </Text>
        <Text size="m" style={{ marginBottom: 8 }}>
          <b>Email:</b> {user?.email}
        </Text>
        <Text size="m" style={{ marginBottom: 8 }}>
          <b>Пол:</b> {user?.gender === 'male' ? 'Мужской' : 'Женский'}
        </Text>
        <Text size="m">
          <b>Статус:</b>{' '}
          <Text
            as="span"
            view={user?.status === 'active' ? 'success' : 'alert'}
          >
            {user?.status === 'active' ? 'Активен' : 'Неактивен'}
          </Text>
        </Text>
      </Card>
    </div>
  )
}
