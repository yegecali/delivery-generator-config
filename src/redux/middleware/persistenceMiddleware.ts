import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { saveToLocalStorage } from '../../utils/StorageUtils'

/**
 * Middleware de Redux que persiste el estado en localStorage
 * Se ejecuta después de cada acción y guarda la parte relevante del estado
 */
export const persistenceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // Ejecutar la acción primero
  const result = next(action)

  // Después de la acción, guardar el estado relevante en localStorage
  const state = store.getState()
  const persistedState = {
    config: {
      configFileName: state.config.configFileName,
      config: state.config.config
    },
    selection: {
      selectedEnv: state.selection.selectedEnv,
      selectedByEnv: state.selection.selectedByEnv
    }
  }

  saveToLocalStorage(persistedState)

  return result
}
