import { configureStore } from '@reduxjs/toolkit'
import configReducer from './slices/configSlice'
import selectionReducer from './slices/selectionSlice'
import { persistenceMiddleware } from './middleware/persistenceMiddleware'
import { loadFromLocalStorage } from '../utils/StorageUtils'

// Cargar estado guardado en localStorage
const persistedState = loadFromLocalStorage()

// Crear store con middleware de persistencia
export const store = configureStore({
  reducer: {
    config: configReducer,
    selection: selectionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
  preloadedState: persistedState ? {
    config: {
      configFileName: persistedState.config.configFileName,
      config: persistedState.config.config,
      configError: null,
      isLoading: false
    },
    selection: {
      selectedEnv: persistedState.selection.selectedEnv,
      selectedByEnv: persistedState.selection.selectedByEnv
    }
  } : undefined
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
