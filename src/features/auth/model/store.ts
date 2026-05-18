import { create } from 'zustand'

interface AuthState {
  token: string
  setToken: (token: string) => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  token: '',
  isAuthenticated: false,
  setToken: (token: string) =>
    set({ token, isAuthenticated: token.trim().length > 0 }),
}))
