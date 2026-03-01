export interface Config {
  appName: string
  version?: string
  settings: {
    enableFeatureX: boolean
    maxItems: number
    endpoints: string[]
  }
}

export function isValidConfig(obj: any): obj is Config {
  if (typeof obj !== 'object' || obj === null) return false
  if (typeof obj.appName !== 'string') return false
  if (obj.version !== undefined && typeof obj.version !== 'string') return false
  const s = obj.settings
  if (typeof s !== 'object' || s === null) return false
  if (typeof s.enableFeatureX !== 'boolean') return false
  if (typeof s.maxItems !== 'number') return false
  if (!Array.isArray(s.endpoints)) return false
  if (!s.endpoints.every((e: any) => typeof e === 'string')) return false
  return true
}
