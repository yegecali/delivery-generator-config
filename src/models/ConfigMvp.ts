export interface ConfigMvpLoad {
  Quality: EnvProperties
  Production: EnvProperties
}

export interface EnvProperties {
  name: string
  pipelinesBuilding: PipelineBuilding[]
  pipelinesReverse: PipelineBuilding[]
}

export interface PipelineBuilding {
  name: string
  url: string
  // some configs use `paramaters` (typo) and others `parameters`
  paramaters?: PipelineParameter[]
  parameters?: PipelineParameter[]
}

export interface PipelineParameter {
  name: string
  type: string
  required: boolean
}

export function isValidConfigMvp(obj: any): obj is ConfigMvpLoad {
  if (typeof obj !== 'object' || obj === null) return false
  const envs = ['Quality', 'Production']
  for (const e of envs) {
    const ev = obj[e]
    if (typeof ev !== 'object' || ev === null) return false
    if (typeof ev.name !== 'string') return false
    const lists = ['pipelinesBuilding', 'pipelinesReverse']
    for (const l of lists) {
      const arr = ev[l]
      if (!Array.isArray(arr)) return false
      for (const p of arr) {
        if (typeof p !== 'object' || p === null) return false
        if (typeof p.name !== 'string') return false
        if (typeof p.url !== 'string') return false
        const params = p.paramaters ?? p.parameters
        if (params === undefined) continue
        if (!Array.isArray(params)) return false
        for (const param of params) {
          if (typeof param !== 'object' || param === null) return false
          if (typeof param.name !== 'string') return false
          if (typeof param.type !== 'string') return false
          if (typeof param.required !== 'boolean') return false
        }
      }
    }
  }
  return true
}