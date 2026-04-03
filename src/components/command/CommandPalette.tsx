import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { Search, TerminalSquare, Rocket, Database, Settings } from 'lucide-react'

const mockCommands = [
  { id: '1', title: 'Open Terminal', icon: TerminalSquare, action: 'terminal' },
  { id: '2', title: 'Deploy Application', icon: Rocket, action: 'deploy' },
  { id: '3', title: 'Query Database', icon: Database, action: 'query' },
  { id: '4', title: 'System Settings', icon: Settings, action: 'settings' }
]

export function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPalette } = useAppStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPalette(!isCommandPaletteOpen)
      }
      if (e.key === 'Escape') {
        setCommandPalette(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen, setCommandPalette])

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isCommandPaletteOpen])

  const filteredCommands = mockCommands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPalette(false)}
            className="absolute inset-0 z-[100] bg-slate-900/30 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 top-[20%] p-4 z-[101] flex justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center px-4 py-3 border-b border-slate-100 relative">
                <Search className="w-5 h-5 text-purple-500 absolute left-4" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 pl-8 pr-4 text-lg font-medium"
                />
                <div className="shrink-0 flex items-center gap-1.5 opacity-60 px-2 py-1 rounded-md bg-slate-100 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500">ESC</span>
                </div>
              </div>

              <div className="p-2 max-h-[300px] overflow-y-auto">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold px-3 py-2">
                  Suggestions
                </div>
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    {filteredCommands.map((command, idx) => (
                      <motion.button
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={command.id}
                        onClick={() => setCommandPalette(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 group-hover:bg-purple-100 group-hover:text-purple-600 group-hover:border-purple-200 transition-colors text-slate-500">
                          <command.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-purple-700 transition-colors">{command.title}</span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-6 text-center text-sm text-slate-500 font-medium">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
