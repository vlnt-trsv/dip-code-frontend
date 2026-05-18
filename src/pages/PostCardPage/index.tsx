import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'
import { Loader } from '@consta/uikit/Loader'
import { Card } from '@consta/uikit/Card'
import { IconArrowLeft } from '@consta/icons/IconArrowLeft'
import { getPostById, getCommentsByPostId } from '../../entities/post/api'

export const PostCardPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(Number(id)),
    enabled: !!id,
  })

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentsByPostId(Number(id)),
    enabled: !!id,
  })

  if (postLoading) return <Loader />

  return (
    <div style={{ padding: '32px 40px', maxWidth: 760 }}>
      <Button
        label="Назад"
        view="ghost"
        iconLeft={IconArrowLeft}
        onClick={() => navigate('/posts')}
        style={{ marginBottom: 24 }}
      />

      <Card style={{ padding: 32, marginBottom: 32 }}>
        <Text size="xs" view="secondary" style={{ marginBottom: 8 }}>
          Пост #{post?.id}
        </Text>
        <Text size="2xl" weight="bold" style={{ marginBottom: 16 }}>
          {post?.title}
        </Text>
        <Text size="m" view="secondary">
          {post?.body}
        </Text>
      </Card>

      <Text size="xl" weight="semibold" style={{ marginBottom: 16 }}>
        Комментарии ({comments.length})
      </Text>

      {commentsLoading ? (
        <Loader type="circle"/>
      ) : comments.length === 0 ? (
        <Text view="secondary">Комментариев нет</Text>
      ) : (
        comments.map((comment) => (
          <Card key={comment.id} style={{ padding: 20, marginBottom: 12 }}>
            <Text size="s" weight="semibold" style={{ marginBottom: 4 }}>
              {comment.name}
            </Text>
            <Text size="xs" view="secondary" style={{ marginBottom: 8 }}>
              {comment.email}
            </Text>
            <Text size="s">{comment.body}</Text>
          </Card>
        ))
      )}
    </div>
  )
}
