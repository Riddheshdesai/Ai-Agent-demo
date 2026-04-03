import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActivityStore } from '../../store/useActivityStore'
import { CheckCircle2, Info, AlertTriangle, AlertCircle } from 'lucide-react'

export function ActivityPanel() {
  const { logs } = useActivityStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />
      default: return <Info className="w-4 h-4 text-blue-400" />
    }
  }

  return (
    <div className="h-full flex flex-col pt-2">
      <div className="px-5 py-4 border-b border-white/40">
        <h3 className="text-[13px] font-bold tracking-wider text-slate-800 uppercase">System Activity</h3>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              key={log.id}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-white/70 transition-colors cursor-pointer"
            >
              <div className="mt-0.5 shrink-0 bg-white p-1.5 rounded-[10px] border border-slate-100 shadow-sm">
                {getIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-slate-700 leading-snug break-words font-medium">{log.message}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wide">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
