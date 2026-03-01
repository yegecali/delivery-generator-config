import React, { ReactNode } from 'react'
import { FiZap, FiGithub } from 'react-icons/fi'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-2xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl shadow-lg">
                <FiZap size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                  Delivery Generator
                </h1>
                <p className="text-xs sm:text-sm text-cyan-300/80 font-medium">Genera configuraciones en segundos</p>
              </div>
            </div>
            <a href="#" className="p-2 hover:bg-cyan-500/20 rounded-lg transition-all hidden sm:flex items-center justify-center">
              <FiGithub size={24} className="text-orange-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - Flex grow para empujar footer al bottom */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-gradient-to-r from-slate-800 to-slate-900 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p className="text-cyan-200/60">© 2026 Delivery Generator • Construido con</p>
          <p className="text-orange-400/80 text-xs mt-1">React • Tailwind CSS • Redux • TypeScript</p>
        </div>
      </footer>
    </div>
  )
}
