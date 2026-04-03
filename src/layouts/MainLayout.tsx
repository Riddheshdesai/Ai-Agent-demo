import type { ReactNode } from 'react'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { ActivityPanel } from '@/components/activity/ActivityPanel'
import { CommandPalette } from '@/components/command/CommandPalette'
import { useAppStore } from '@/store/useAppStore'
import { Cpu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isActivityPanelOpen, toggleActivityPanel } = useAppStore()

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--color-app-bg)] text-slate-800 overflow-hidden">
      
      {/* Elegant Mesh Background (Required to make glass visible) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 z-0" />
      {/* <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-300/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[120px] pointer-events-none z-0" /> */}

      {/* TitleBar */}
      <div className="h-12 border-b border-white/50 bg-[var(--color-glass-base)] backdrop-blur-xl flex items-center justify-between drag-region relative z-50">
        <div className="flex-1 text-center flex items-center justify-center gap-2 drag-region">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">System Idle</span>
        </div>
        <div className="px-4 no-drag shrink-0 flex gap-2">
           <button 
             onClick={toggleActivityPanel}
             className="p-1.5 rounded-xl hover:bg-white text-slate-500 hover:text-purple-600 transition-all glass-button flex items-center gap-2 cursor-pointer"
           >
             <Cpu className="w-4 h-4" />
             <span className="text-xs pr-1 font-semibold">Logs</span>
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative z-10 glass-panel border-0 border-t border-[var(--color-glass-border)]">
        <Sidebar />
        
        <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
          {children}
        </main>
        
        <AnimatePresence initial={false}>
          {isActivityPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
              className="border-l border-white/60 bg-white/30 backdrop-blur-3xl text-slate-800 shadow-[-10px_0_30px_rgba(107,70,193,0.05)] relative z-20 overflow-hidden"
            >
              <div className="w-[340px] h-full">
                <ActivityPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <CommandPalette />
    </div>
  )
}
