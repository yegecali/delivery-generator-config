import React from 'react'
import { FiUpload } from 'react-icons/fi'

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  trigger: () => void
}

export default function LoadButton({ fileInputRef, onChange, trigger }: Props) {
  return (
    <button 
      type="button" 
      onClick={trigger} 
      className="w-full py-4 px-6 mb-8 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center gap-3 text-lg transform hover:scale-105 active:scale-95"
    >
      <FiUpload size={26} />
      Cargar archivo JSON
    </button>
  )
}
