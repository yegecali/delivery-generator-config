import React from 'react'
import { FiEye } from 'react-icons/fi'
import { DeliveryConfig } from '../models/Delivery'

interface Props {
  delivery: DeliveryConfig
}

export default function Preview({ delivery }: Props) {
  return (
    <div className="fade-in bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20">
      <div className="bg-gradient-to-r from-cyan-500 to-orange-500 p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <FiEye size={22} />
          <h3 className="text-lg font-bold">Vista Preliminar</h3>
        </div>
        <p className="text-cyan-50 text-sm font-medium">Archivo delivery.json que se descargará</p>
      </div>
      
      <div className="p-5">
        <pre className="max-h-96 overflow-auto bg-slate-950 text-cyan-100 p-4 rounded-lg text-xs font-mono whitespace-pre-wrap break-words border border-cyan-500/20 shadow-inner">
          {JSON.stringify(delivery, null, 2)}
        </pre>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-400/50 rounded-lg text-sm text-orange-200 flex items-start gap-3">
          <span className="text-orange-400 font-bold flex-shrink-0 text-lg">→</span>
          <span>Haz clic en "Generar y Descargar" para obtener el archivo JSON</span>
        </div>
      </div>
    </div>
  )
}
