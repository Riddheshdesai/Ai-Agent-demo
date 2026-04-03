import { create } from 'zustand'

interface AppState {
  isCommandPaletteOpen: boolean
  isActivityPanelOpen: boolean
  activeScreen: string
  toggleCommandPalette: () => void
  toggleActivityPanel: () => void
  setCommandPalette: (open: boolean) => void
  setActiveScreen: (screen: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  isCommandPaletteOpen: false,
  isActivityPanelOpen: true,
  activeScreen: 'Chat',
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  toggleActivityPanel: () => set((state) => ({ isActivityPanelOpen: !state.isActivityPanelOpen })),
  setCommandPalette: (open) => set({ isCommandPaletteOpen: open }),
  setActiveScreen: (screen) => set({ activeScreen: screen })
}))
