import React from 'react'
import { PipelineParameter } from '../models/ConfigMvp'

interface ParameterInputProps {
  param: PipelineParameter
  value: string
  onChange: (value: string) => void
}

export default function ParameterInput({ param, value, onChange }: ParameterInputProps) {
  return (
    <div>
      <label className="text-sm font-medium text-cyan-200 flex items-center gap-1 mb-2">
        {param.name}
        {param.required && <span className="text-orange-400 font-bold">*</span>}
        <span className="text-xs font-normal text-slate-400 ml-auto bg-slate-600 px-2 py-0.5 rounded">
          {param.type}
        </span>
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`Ingresa ${param.name.toLowerCase()}`}
        className="w-full px-3 py-2 border border-slate-600 bg-slate-800 text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm placeholder-slate-500"
      />
    </div>
  )
}
