import { motion } from 'framer-motion'
import { Zap, Play, Pause, MoreVertical, LayoutDashboard } from 'lucide-react'

export function WorkflowsPanel() {
  const dummyWorkflows = [
    { id: 1, title: 'Daily Report Generator', status: 'active', runs: 142, icon: LayoutDashboard },
    { id: 2, title: 'Code Review Assistant', status: 'paused', runs: 89, icon: Zap },
    { id: 3, title: 'Data Scraper Bot', status: 'active', runs: 1045, icon: Zap },
  ]

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth z-10 w-full">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Active Workflows</h2>
            <p className="text-[13px] text-slate-500 font-medium mt-1">Manage and monitor your automated AI sequences.</p>
          </div>
          <button className="px-4 py-2 text-[13px] rounded-xl bg-gradient-to-r from-[#7a5af8] to-[#5b3ce0] text-white font-semibold shadow-[0_4px_14px_rgba(107,70,193,0.4)] hover:opacity-90 transition-opacity cursor-pointer">
            + New Workflow
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyWorkflows.map((workflow, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={workflow.id}
              className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-3xl p-6 relative group overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-[40px] pointer-events-none group-hover:bg-purple-400/30 transition-colors" />

              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                  <workflow.icon className="w-6 h-6 text-purple-600" />
                </div>
                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-[14px] font-bold text-slate-800 mb-1">{workflow.title}</h3>
              <p className="text-[13px] text-slate-500 font-medium mb-6">{workflow.runs} successful runs</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${workflow.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-300'}`} />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{workflow.status}</span>
                </div>
                
                <button className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  workflow.status === 'active' 
                    ? 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                }`}>
                  {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
