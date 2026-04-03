import { motion } from 'framer-motion'
import { LogOut, CreditCard, ChevronRight } from 'lucide-react'

export function ProfilePanel() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth z-10 w-full">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mt-8 mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7a5af8] to-[#5b3ce0] flex items-center justify-center text-white font-bold text-4xl shadow-[0_10px_30px_rgba(107,70,193,0.4)] ring-8 ring-white z-10 relative">
            MT
          </div>
          <div className="absolute inset-0 bg-purple-400 rounded-full blur-[30px] opacity-50 pointer-events-none" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1"
        >
          Meng To
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[13px] font-medium text-purple-600 bg-purple-50 px-4 py-1 rounded-full border border-purple-100 mb-10"
        >
          Pro Member
        </motion.p>

        <div className="w-full space-y-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:bg-white/80 transition-colors"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                 <CreditCard className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-[14px] font-bold text-slate-800">Manage Subscription</p>
                 <p className="text-[12px] font-medium text-slate-500">Next billing on Dec 01, 2026</p>
               </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-red-50/50 backdrop-blur-xl border border-red-100 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.05)] rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-white border border-red-100 flex items-center justify-center text-red-500 shadow-sm">
                 <LogOut className="w-4 h-4 ml-1" />
               </div>
               <div>
                 <p className="text-[14px] font-bold text-red-600">Sign Out</p>
                 <p className="text-[12px] font-medium text-red-400">Log out of your account</p>
               </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
