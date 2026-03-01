import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfigMvpLoad } from '../../models/ConfigMvp'
import { clearLocalStorage } from '../../utils/StorageUtils'

export interface ConfigState {
  configFileName: string | null
  config: ConfigMvpLoad | null
  configError: string | null
  isLoading: boolean
}

const initialState: ConfigState = {
  configFileName: null,
  config: null,
  configError: null,
  isLoading: false
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigFileName: (state, action: PayloadAction<string | null>) => {
      state.configFileName = action.payload
    },
    setConfig: (state, action: PayloadAction<ConfigMvpLoad | null>) => {
      state.config = action.payload
      // Si se carga una config nueva, no es la del localStorage, así que limpiar
      if (action.payload !== null) {
        clearLocalStorage()
      }
    },
    setConfigError: (state, action: PayloadAction<string | null>) => {
      state.configError = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    resetConfig: (state) => {
      state.configFileName = null
      state.config = null
      state.configError = null
      state.isLoading = false
      clearLocalStorage()
    }
  }
})

export const {
  setConfigFileName,
  setConfig,
  setConfigError,
  setIsLoading,
  resetConfig
} = configSlice.actions

export default configSlice.reducer
