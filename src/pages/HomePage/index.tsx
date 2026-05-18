import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@consta/uikit/TextField'
import { Button } from '@consta/uikit/Button'
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup'
import { Text } from '@consta/uikit/Text'
import { useAuthStore } from '../../features/auth/model/store'
import { useSwitchModeStore, type ViewMode } from '../../features/switchMode/model/store'

const modeItems: { label: string; value: ViewMode }[] = [
  { label: 'Пользователи', value: 'users' },
  { label: 'Посты', value: 'posts' },
]

export const HomePage = () => {
  const { token, setToken } = useAuthStore()
  const { mode, setMode } = useSwitchModeStore()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!token.trim()) {
      setError('Введите access token')
      return
    }
    setError(null)
    navigate(`/${mode}`)
  }

  return (
    <div style={{ maxWidth: 480, margin: '120px auto', padding: '0 16px' }}>
      <Text size="3xl" weight="bold" style={{ marginBottom: 32 }}>
        Dip Code Frontend
      </Text>

      <TextField
        label="Access Token"
        placeholder="Введите ваш токен с gorest.co.in"
        value={token}
        onChange={(value) => setToken(value ?? '')}
        status={error ? 'alert' : undefined}
        caption={error ?? undefined}
        style={{ marginBottom: 24 }}
      />

      <Text size="s" view="secondary" style={{ marginBottom: 8 }}>
        Режим просмотра
      </Text>
      <ChoiceGroup
        items={modeItems}
        value={modeItems.find((i) => i.value === mode) ?? modeItems[0]}
        getItemLabel={(item) => item.label}
        onChange={(item) => setMode(item.value)}
        style={{ marginBottom: 32 }}
        name={'mode-choice-group'}
      />

      <Button label="Войти" width="full" onClick={handleSubmit} />
    </div>
  )
}
