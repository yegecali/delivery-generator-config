import React from 'react'
import { FiLink, FiChevronDown } from 'react-icons/fi'
import { PipelineBuilding } from '../models/ConfigMvp'
import { DeliveryPipeline } from '../models/Delivery'
import ParameterInput from './ParameterInput'
import { 
  getEnvColorConfig, 
  getSelectedPipelines, 
  isPipelineSelected, 
  getSelectedPipelineEntry,
  getPipelineParameters 
} from '../utils/StringUtils'

interface Props {
  envName: 'Quality' | 'Production'
  list: PipelineBuilding[]
  selectedByEnv: Record<string, DeliveryPipeline[]>
  togglePipeline: (env: 'Quality' | 'Production', p: PipelineBuilding) => void
  setParamValue: (env: 'Quality' | 'Production', pipelineName: string, paramName: string, value: any) => void
}

export default function PipelineList({ envName, list, selectedByEnv, togglePipeline, setParamValue }: Props) {
  const colorConfig = getEnvColorConfig(envName, false)

  return (
    <div className="space-y-3">
      {list.map(p => {
        const selected = isPipelineSelected(selectedByEnv, envName, p.name)
        const paramsSource = getPipelineParameters(p)
        const selectedEntry = getSelectedPipelineEntry(selectedByEnv, envName, p.name)
        
        return (
          <div 
            key={p.name} 
            className={`border-2 rounded-xl transition-all duration-300 ${
              selected 
                ? 'border-cyan-400 bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg shadow-cyan-500/20' 
                : 'border-slate-700 bg-slate-800 hover:border-cyan-300/50 hover:shadow-md'
            }`}
          >
            <label className="flex items-center gap-3 p-4 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selected} 
                onChange={() => togglePipeline(envName, p)} 
                className={`w-5 h-5 cursor-pointer rounded accent-${colorConfig.accentColor}`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-cyan-100">{p.name}</div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1 break-all">
                  <FiLink size={14} className="flex-shrink-0 text-orange-400" />
                  <code className="text-slate-500">{p.url}</code>
                </div>
              </div>
              {selected && paramsSource.length > 0 && (
                <FiChevronDown size={20} className="text-orange-400 flex-shrink-0" />
              )}
            </label>

            {/* Parameters Section */}
            {selected && paramsSource.length > 0 && (
              <div className="px-4 pb-4 pt-0 border-t border-cyan-400/30 space-y-3">
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                  {paramsSource.map((param) => {
                    const curVal = selectedEntry?.parameters.find((pp: any) => pp.name === param.name)?.value ?? ''
                    return (
                      <ParameterInput
                        key={param.name}
                        param={param}
                        value={curVal}
                        onChange={(newValue) => setParamValue(envName, p.name, param.name, newValue)}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
