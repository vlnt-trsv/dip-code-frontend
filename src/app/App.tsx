import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import { router } from './providers/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme preset={presetGpnDefault}>
        <RouterProvider router={router} />
      </Theme>
    </QueryClientProvider>
  )
}
