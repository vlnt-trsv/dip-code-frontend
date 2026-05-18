import { create } from 'zustand'

export type ViewMode = 'users' | 'posts'

interface SwitchModeState {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
}

export const useSwitchModeStore = create<SwitchModeState>((set) => ({
  mode: 'users',
  setMode: (mode) => set({ mode }),
}))
