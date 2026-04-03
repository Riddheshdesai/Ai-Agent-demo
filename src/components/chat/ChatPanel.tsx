import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatStore } from '../../store/useChatStore'
import { useActivityStore } from '../../store/useActivityStore'
import { Send, Sparkles } from 'lucide-react'

export function ChatPanel() {
  const { messages, addMessage, isTyping, setTyping } = useChatStore()
  const { addLog } = useActivityStore()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    
    addMessage({ role: 'user', content: input.trim() })
    setInput('')
    setTyping(true)
    addLog(`User requested: "${input.substring(0, 20)}${input.length > 20 ? '...' : ''}"`, 'info')

    setTimeout(() => {
      addLog('Analyzing request structure...', 'info')
      setTimeout(() => {
        addLog('Querying mock databases for parameters', 'success')
        setTimeout(() => {
          setTyping(false)
          addMessage({ 
            role: 'assistant', 
            content: `I've analyzed your request carefully. This is a simulated response indicating that the AI system processed your prompt correctly. Is there anything else you'd like to explore?` 
          })
          addLog('Completed generation.', 'success')
        }, 1500)
      }, 1000)
    }, 500)
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm bg-white border border-slate-100">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                )}
                
                <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed relative ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-tr from-[#7a5af8] to-[#5b3ce0] text-white rounded-tr-none shadow-[0_4px_16px_rgba(107,70,193,0.2)]' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none font-normal shadow-sm'
                }`}>
                  <span className="relative z-10">{msg.content}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <AnimatePresence>
            {isTyping && (
               <motion.div
                 layout
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="flex gap-4"
               >
                 <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-md shrink-0">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                 </div>
                 <div className="px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-tl-none flex items-center gap-1.5 h-[52px]">
                   <motion.div className="w-2 h-2 bg-purple-400 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} />
                   <motion.div className="w-2 h-2 bg-purple-400 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} />
                   <motion.div className="w-2 h-2 bg-purple-400 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} />
                 </div>
               </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 z-10 max-w-4xl mx-auto w-full">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-2xl blur opacity-30 group-focus-within:opacity-80 transition duration-500" />
          <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask the AI OS Agent to perform a task..."
              className="flex-1 bg-transparent px-5 py-3.5 text-sm outline-none text-slate-800 placeholder-slate-400 font-medium"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-2 mr-2 rounded-xl bg-gradient-to-r from-[#7a5af8] to-[#5b3ce0] hover:opacity-90 disabled:opacity-50 disabled:hover:opacity-50 transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-white ml-0.5" />
            </button>
          </div>
        </div>
        <div className="text-center mt-3 text-[11px] text-slate-400 font-bold tracking-wide">
          Press <kbd className="px-1.5 py-0.5 mx-0.5 rounded-md bg-white border border-slate-200 text-slate-500 shadow-sm">Cmd</kbd> + <kbd className="px-1.5 py-0.5 mx-0.5 rounded-md bg-white border border-slate-200 text-slate-500 shadow-sm">K</kbd> to open command palette
        </div>
      </div>
    </div>
  )
}
