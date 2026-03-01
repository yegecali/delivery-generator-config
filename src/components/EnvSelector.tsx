import React from 'react'
import { FiSettings, FiCloud } from 'react-icons/fi'

interface Props {
  selectedEnv: 'Quality' | 'Production'
  setSelectedEnv: (v: 'Quality' | 'Production') => void
}

/**
 * Helper para construir las clases CSS del card de ambiente
 */
function getEnvCardClasses(envName: 'Quality' | 'Production', isSelected: boolean): {
  container: string
  icon: string
  text: string
  input: string
} {
  if (envName === 'Quality') {
    return {
      container: `flex items-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all transform ${
        isSelected 
          ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 hover:border-cyan-300 scale-105' 
          : 'border-slate-700 bg-slate-700/30 hover:border-cyan-400/50 hover:bg-slate-700/50'
      }`,
      icon: isSelected ? 'text-cyan-400' : 'text-slate-400',
      text: isSelected ? 'text-cyan-300' : 'text-slate-300',
      input: 'w-4 h-4 cursor-pointer accent-cyan-400',
    }
  }
  
  // Production
  return {
    container: `flex items-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all transform ${
      isSelected 
        ? 'border-orange-400 bg-gradient-to-br from-orange-500/20 to-orange-600/10 hover:border-orange-300 scale-105' 
        : 'border-slate-700 bg-slate-700/30 hover:border-orange-400/50 hover:bg-slate-700/50'
    }`,
    icon: isSelected ? 'text-orange-400' : 'text-slate-400',
    text: isSelected ? 'text-orange-300' : 'text-slate-300',
    input: 'w-4 h-4 cursor-pointer accent-orange-400',
  }
}

export default function EnvSelector({ selectedEnv, setSelectedEnv }: Props) {
  const qualityClasses = getEnvCardClasses('Quality', selectedEnv === 'Quality')
  const productionClasses = getEnvCardClasses('Production', selectedEnv === 'Production')

  return (
    <div className="grid grid-cols-2 gap-4">
      <label className={qualityClasses.container}>
        <input 
          type="radio" 
          name="env" 
          checked={selectedEnv === 'Quality'} 
          onChange={() => setSelectedEnv('Quality')} 
          className={qualityClasses.input}
        />
        <div className="flex-1">
          <FiSettings className={`${qualityClasses.icon} mb-2`} size={20} />
          <span className={`font-bold block ${qualityClasses.text}`}>Quality</span>
          <span className="text-xs text-slate-400">Testing</span>
        </div>
      </label>

      <label className={productionClasses.container}>
        <input 
          type="radio" 
          name="env" 
          checked={selectedEnv === 'Production'} 
          onChange={() => setSelectedEnv('Production')} 
          className={productionClasses.input}
        />
        <div className="flex-1">
          <FiCloud className={`${productionClasses.icon} mb-2`} size={20} />
          <span className={`font-bold block ${productionClasses.text}`}>Production</span>
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </label>
    </div>
  )
}
