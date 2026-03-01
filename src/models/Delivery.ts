export interface DeliveryConfig {
  Quality: DeliveryEnvConfig
  Production: DeliveryEnvConfig
}

export interface DeliveryEnvConfig {
  name: string
  pipelinesBuilding: DeliveryPipeline[]
  pipelinesReverse: DeliveryPipeline[]
}

export interface DeliveryPipeline {
  name: string
  url: string
  parameters: DeliveryPipelineParameter[]
}

export interface DeliveryPipelineParameter {
  name: string
  type: string
  required: boolean
  value?: any
}
