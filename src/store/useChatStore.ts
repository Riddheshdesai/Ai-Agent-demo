import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatState {
  messages: Message[]
  isTyping: boolean
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (typing: boolean) => void
}

const mockInitialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I am your AI OS Agent. I can help you analyze data, automate workflows, or answer questions. How can I assist you today?',
    timestamp: Date.now() - 10000,
  }
]

export const useChatStore = create<ChatState>((set) => ({
  messages: mockInitialMessages,
  isTyping: false,
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...message,
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
      }
    ]
  })),
  setTyping: (typing) => set({ isTyping: typing }),
}))
