import { useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, Sparkles, Cpu } from 'lucide-react'

export function ModelsPanel() {
  const [models, setModels] = useState([
    { id: 'gpt4', name: 'GPT-4 Turbo', provider: 'OpenAI', icon: Sparkles, active: true },
    { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: BrainCircuit, active: false },
    { id: 'llama', name: 'Llama 3 70B', provider: 'Meta', icon: Cpu, active: false },
  ])

  const toggleModel = (id: string) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m))
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth z-10 w-full">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Models</h2>
          <p className="text-[13px] text-slate-500 font-medium mt-1">Configure which models are available for tasks and chats.</p>
        </div>

        <div className="space-y-4">
          {models.map((model, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={model.id}
              className="flex items-center justify-between p-5 bg-white/60 backdrop-blur-xl border border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-2xl group"
            >
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                  model.active ? 'bg-gradient-to-tr from-[#7a5af8] to-[#5b3ce0]' : 'bg-white border border-slate-100'
                }`}>
                  <model.icon className={`w-5 h-5 ${model.active ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-0.5">{model.name}</h3>
                  <p className="text-[12px] text-slate-500 font-medium">{model.provider}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleModel(model.id)}
                className={`w-14 h-8 rounded-full p-1 transition-colors relative cursor-pointer shadow-inner ${
                  model.active ? 'bg-gradient-to-r from-[#7a5af8] to-[#5b3ce0]' : 'bg-slate-200'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  model.active ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
