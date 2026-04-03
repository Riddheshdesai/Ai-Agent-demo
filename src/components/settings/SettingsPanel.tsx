import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Key, Palette, Shield } from 'lucide-react'

type SettingItem = {
  name: string
  value?: string
  type?: 'toggle'
  active?: boolean
  action?: string
}

type SettingSection = {
  title: string
  icon: any
  items: SettingItem[]
}

export function SettingsPanel() {
  const [sections, setSections] = useState<SettingSection[]>([
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { name: 'Theme', value: 'Light Neumorphic' },
        { name: 'Animations', type: 'toggle', active: true }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Desktop Alerts', type: 'toggle', active: true },
        { name: 'Task Completion Sounds', type: 'toggle', active: false }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { name: 'API Key Management', action: 'Manage' },
        { name: 'Local Data Encryption', type: 'toggle', active: true }
      ]
    }
  ])

  const toggleSetting = (sectionTitle: string, itemName: string) => {
    setSections(prev => prev.map(sec => {
      if (sec.title === sectionTitle) {
        return {
          ...sec,
          items: sec.items.map(item => item.name === itemName ? { ...item, active: !item.active } : item)
        }
      }
      return sec
    }))
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth z-10 w-full">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Settings</h2>
          <p className="text-[13px] text-slate-500 font-medium mt-1">Manage your application preferences.</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, sIdx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.1 }}
              key={section.title}
            >
              <div className="flex items-center gap-2 mb-3 px-2">
                <section.icon className="w-4 h-4 text-purple-600" />
                <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">{section.title}</h3>
              </div>

              <div className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden">
                {section.items.map((item, iIdx) => (
                  <div 
                    key={item.name} 
                    className={`flex items-center justify-between p-4 ${iIdx !== section.items.length - 1 ? 'border-b border-slate-100' : ''}`}
                  >
                    <span className="text-[13px] font-semibold text-slate-700">{item.name}</span>
                    
                    {item.type === 'toggle' ? (
                      <button 
                        onClick={() => toggleSetting(section.title, item.name)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors relative cursor-pointer shadow-inner ${
                        item.active ? 'bg-gradient-to-r from-[#7a5af8] to-[#5b3ce0]' : 'bg-slate-200'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
                          item.active ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    ) : item.action ? (
                      <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:text-purple-600 hover:border-purple-200 shadow-sm transition-colors cursor-pointer">
                        {item.action}
                      </button>
                    ) : (
                      <span className="text-[12px] font-medium text-slate-500">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
