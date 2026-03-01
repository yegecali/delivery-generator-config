import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Obtener el nombre del repositorio para la URL base de GitHub Pages
// Por defecto usa "/" para el usuario principal, o "/repo-name/" para repos secundarios
const getBase = () => {
  // Si quieres que funcione en un subdirectorio, descomenta y ajusta:
  // return '/generator-config/'
  
  // Para funcionario en el root (usuario.github.io):
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBase(),
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
