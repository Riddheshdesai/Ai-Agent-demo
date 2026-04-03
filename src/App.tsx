import { MainLayout } from './layouts/MainLayout'
import { ChatPanel } from './components/chat/ChatPanel'
import { WorkflowsPanel } from './components/workflows/WorkflowsPanel'
import { ModelsPanel } from './components/models/ModelsPanel'
import { SettingsPanel } from './components/settings/SettingsPanel'
import { ProfilePanel } from './components/profile/ProfilePanel'
import { SplashScreen } from './components/SplashScreen'
import { useEffect, useState } from 'react'
import { useActivityStore } from './store/useActivityStore'
import { useAppStore } from './store/useAppStore'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const { addLog } = useActivityStore()
  const { activeScreen } = useAppStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    addLog('AI OS Interface mounted and ready.', 'success')
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [])

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Workflows': return <WorkflowsPanel />
      case 'AI Models': return <ModelsPanel />
      case 'Settings': return <SettingsPanel />
      case 'Profile': return <ProfilePanel />
      case 'Chat':
      default:
        return <ChatPanel />
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>

      <MainLayout>
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex"
            >
              {renderScreen()}
            </motion.div>
          )}
        </AnimatePresence>
      </MainLayout>
    </>
  )
}

export default App
