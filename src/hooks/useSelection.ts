import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setSelectedEnv, togglePipeline, setParamValue } from '../redux/slices/selectionSlice'
import { DeliveryConfig, DeliveryEnvConfig } from '../models/Delivery'
import { ConfigMvpLoad, PipelineBuilding, PipelineParameter } from '../models/ConfigMvp'

export function useSelection() {
  const dispatch = useDispatch()
  const { selectedEnv, selectedByEnv } = useSelector((state: RootState) => state.selection)

  const togglePipelineAction = (envName: 'Quality' | 'Production', pipeline: PipelineBuilding) => {
    dispatch(togglePipeline({ envName, pipeline }))
  }

  const setParamValueAction = (envName: 'Quality' | 'Production', pipelineName: string, paramName: string, value: any) => {
    dispatch(setParamValue({ envName, pipelineName, paramName, value }))
  }

  const buildDelivery = (config: ConfigMvpLoad): DeliveryConfig => {
    const buildEnv = (envName: 'Quality' | 'Production'): DeliveryEnvConfig => ({
      name: config[envName].name,
      pipelinesBuilding: selectedByEnv[envName] ?? [],
      pipelinesReverse: []
    })
    return { Quality: buildEnv('Quality'), Production: buildEnv('Production') }
  }

  return { 
    selectedEnv, 
    setSelectedEnv: (env: 'Quality' | 'Production') => dispatch(setSelectedEnv(env)),
    selectedByEnv, 
    togglePipeline: togglePipelineAction,
    setParamValue: setParamValueAction,
    buildDelivery 
  }
}

