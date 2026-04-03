import { MessageSquare, LayoutDashboard, Settings, BrainCircuit, MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export function Sidebar() {
  const { activeScreen, setActiveScreen } = useAppStore()

  const navItems = [
    { icon: MessageSquare, label: 'Chat', active: activeScreen === 'Chat' },
    { icon: LayoutDashboard, label: 'Workflows', active: activeScreen === 'Workflows' },
    { icon: BrainCircuit, label: 'AI Models', active: activeScreen === 'AI Models' },
    { icon: Settings, label: 'Settings', active: activeScreen === 'Settings' },
  ]

  return (
    <div className="w-16 md:w-64 h-full border-r border-[#cad1db]/40 bg-white/40 flex flex-col items-center md:items-start py-4 transition-all duration-300">
      
      <div className="px-4 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7a5af8] to-[#5b3ce0] flex items-center justify-center shadow-lg shrink-0">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold hidden md:block text-slate-800 tracking-tight text-lg">AI OS Agent</span>
      </div>

      <nav className="flex-1 w-full px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveScreen(item.label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group cursor-pointer ${
              item.active ? 'text-purple-700 font-semibold' : 'text-slate-500 font-medium hover:text-purple-600'
            }`}
          >
            {item.active && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-xl"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className="w-5 h-5 relative z-10 shrink-0" />
            <span className="relative z-10 hidden md:block text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto w-full p-4 border-t border-slate-200/50 mt-4">
        <button onClick={() => setActiveScreen('Profile')} className="w-full flex items-center justify-center md:justify-start gap-3 p-2 md:px-3 md:py-2.5 rounded-xl hover:bg-slate-100/50 transition-colors group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7a5af8] to-[#5b3ce0] shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_12px_rgba(107,70,193,0.3)] ring-2 ring-white">
            MT
          </div>
          <div className="hidden md:block text-left flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">Meng To</p>
            <p className="text-[11px] font-medium text-slate-500 truncate">Pro Member</p>
          </div>
          <div className="hidden md:flex shrink-0 w-6 h-6 items-center justify-center rounded-md text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-100 transition-colors">
             <MoreHorizontal className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  )
}
