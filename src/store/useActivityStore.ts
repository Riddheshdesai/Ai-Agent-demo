import { create } from 'zustand'

export interface LogEntry {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: number
}

interface ActivityState {
  logs: LogEntry[]
  addLog: (message: string, type?: LogEntry['type']) => void
  clearLogs: () => void
}

export const useActivityStore = create<ActivityState>((set) => ({
  logs: [
    { id: 'start', message: 'System initialized successfully.', type: 'success', timestamp: Date.now() - 20000 },
    { id: 'connect', message: 'Connected to AI core.', type: 'info', timestamp: Date.now() - 10000 },
  ],
  addLog: (message, type = 'info') => set((state) => {
    const newLogs = [
      { id: Math.random().toString(36).substring(7), message, type, timestamp: Date.now() },
      ...state.logs
    ].slice(0, 50)
    return { logs: newLogs }
  }),
  clearLogs: () => set({ logs: [] })
}))
