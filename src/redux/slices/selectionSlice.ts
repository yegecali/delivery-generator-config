import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeliveryPipeline, DeliveryPipelineParameter } from '../../models/Delivery'
import { PipelineBuilding, PipelineParameter } from '../../models/ConfigMvp'

export interface SelectionState {
  selectedEnv: 'Quality' | 'Production'
  selectedByEnv: Record<string, DeliveryPipeline[]>
}

const initialState: SelectionState = {
  selectedEnv: 'Quality',
  selectedByEnv: { Quality: [], Production: [] }
}

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelectedEnv: (state, action: PayloadAction<'Quality' | 'Production'>) => {
      state.selectedEnv = action.payload
    },
    togglePipeline: (state, action: PayloadAction<{ envName: 'Quality' | 'Production'; pipeline: PipelineBuilding }>) => {
      const { envName, pipeline } = action.payload
      const key = envName
      const existing = state.selectedByEnv[key] ?? []
      const pname = pipeline.name
      const found = existing.find(p => p.name === pname)

      if (found) {
        state.selectedByEnv[key] = existing.filter(p => p.name !== pname)
      } else {
        const paramsSource: PipelineParameter[] = (pipeline as any).paramaters ?? (pipeline as any).parameters ?? []
        const params: DeliveryPipelineParameter[] = paramsSource.map(p => ({ 
          name: p.name, 
          type: p.type, 
          required: p.required 
        }))
        const entry: DeliveryPipeline = { 
          name: pipeline.name, 
          url: pipeline.url, 
          parameters: params 
        }
        state.selectedByEnv[key] = [...existing, entry]
      }
    },
    setParamValue: (state, action: PayloadAction<{ envName: 'Quality' | 'Production'; pipelineName: string; paramName: string; value: any }>) => {
      const { envName, pipelineName, paramName, value } = action.payload
      const list = state.selectedByEnv[envName] ?? []
      state.selectedByEnv[envName] = list.map(p => {
        if (p.name !== pipelineName) return p
        return {
          ...p,
          parameters: p.parameters.map(param => 
            param.name === paramName ? { ...param, value } : param
          )
        }
      })
    },
    resetSelection: (state) => {
      state.selectedEnv = 'Quality'
      state.selectedByEnv = { Quality: [], Production: [] }
    }
  }
})

export const {
  setSelectedEnv,
  togglePipeline,
  setParamValue,
  resetSelection
} = selectionSlice.actions

export default selectionSlice.reducer
