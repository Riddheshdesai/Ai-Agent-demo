import { X, Minus, Square } from 'lucide-react'


declare global {
  interface Window {
    ipcRenderer: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}

export function WindowControls() {
  return null
}
