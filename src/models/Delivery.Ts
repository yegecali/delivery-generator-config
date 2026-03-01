interface DeliveryConfig {
    Quality: DeliveryEnvConfig,
    Production: DeliveryEnvConfig
}

interface DeliveryEnvConfig {
    name: string,
    pipelinesBuilding: DeliveryPipeline[]
    pipelinesReverse: DeliveryPipeline[]
}

interface DeliveryPipeline {
    name: string,
    url: string,
    parameters: DeliveryPipelineParameter[]
}

interface DeliveryPipelineParameter {
    name: string,
    type: string,
    required: boolean
}