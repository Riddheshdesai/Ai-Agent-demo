import { motion } from 'framer-motion'

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1060 40%, #1e0a4a 100%)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7a5af8 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #5b3ce0 0%, transparent 70%)', filter: 'blur(80px)' }}
      />



      {/* App name */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-white font-bold text-2xl tracking-tight mb-1"
      >
        AI OS Agent
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="text-white/40 text-sm font-medium mb-12 tracking-wide"
      >
        Your intelligent OS companion
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #7a5af8, #a78bfa, transparent)' }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-white/25 text-[11px] font-semibold uppercase tracking-widest mt-4"
      >
        Initializing system...
      </motion.p>
    </motion.div>
  )
}
