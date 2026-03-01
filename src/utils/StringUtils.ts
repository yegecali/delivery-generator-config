/**
 * Normaliza una ruta: convierte backslashes a forward slashes y elimina trailing slashes
 * @param path - Ruta a normalizar
 * @returns Ruta normalizada
 */
function normalizePath(path: string): string {
  let normalized = path.replace(/\\/g, '/')
  
  if (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  
  return normalized
}

/**
 * Extrae el directorio de una ruta completa de Jenkins o URL
 * @param fullPath - Ruta completa (ej: https://ci.example.com/build-frontend o /home/jenkins/jobs/build)
 * @returns Directorio parent (ej: https://ci.example.com/ o /home/jenkins/jobs/)
 * @example
 * getJenkinsDirectory('https://ci.example.com/build-frontend')
 * // Returns: 'https://ci.example.com/'
 * 
 * getJenkinsDirectory('/home/jenkins/jobs/my-job/build')
 * // Returns: '/home/jenkins/jobs/my-job/'
 */
export function getJenkinsDirectory(fullPath: string): string {
  if (!fullPath || typeof fullPath !== 'string') {
    return ''
  }

  const normalized = normalizePath(fullPath)
  const lastSlashIndex = normalized.lastIndexOf('/')

  if (lastSlashIndex === -1) {
    return ''
  }

  return normalized.slice(0, lastSlashIndex + 1)
}

/**
 * Extrae solo el nombre del recurso (último segmento) de una ruta
 * @param fullPath - Ruta completa
 * @returns Nombre del último segmento (ej: 'build-frontend')
 * @example
 * getResourceName('https://ci.example.com/build-frontend')
 * // Returns: 'build-frontend'
 */
export function getResourceName(fullPath: string): string {
  if (!fullPath || typeof fullPath !== 'string') {
    return ''
  }

  const normalized = normalizePath(fullPath)
  const lastSlashIndex = normalized.lastIndexOf('/')
  
  if (lastSlashIndex === -1) {
    return normalized
  }

  return normalized.slice(lastSlashIndex + 1)
}

/**
 * Valida si una ruta es válida (URL o path del sistema)
 * @param path - Ruta a validar
 * @returns true si la ruta es válida
 */
export function isValidPath(path: string): boolean {
  if (!path || typeof path !== 'string') {
    return false
  }

  return path.trim().length > 0
}

/**
 * Obtiene las clases CSS de color para un ambiente específico
 * @param envName - Nombre del ambiente ('Quality' | 'Production')
 * @param isSelected - Si el ambiente está seleccionado
 * @returns Objeto con clases CSS y colores del ambiente
 * @example
 * const config = getEnvColorConfig('Quality', true)
 * // Returns: { borderColor: 'cyan-400', bgColor: 'cyan-500/20', textColor: 'cyan-300', icon: 'cyan-400' }
 */
export function getEnvColorConfig(envName: 'Quality' | 'Production', isSelected: boolean) {
  if (envName === 'Quality') {
    return {
      borderColor: isSelected ? 'cyan-400' : 'slate-700',
      bgColor: isSelected ? 'cyan-500/20' : 'slate-700/30',
      bgGradient: isSelected ? 'from-cyan-500/20 to-cyan-600/10' : undefined,
      textColor: isSelected ? 'cyan-300' : 'slate-300',
      hoverBorder: isSelected ? 'cyan-300' : 'cyan-400/50',
      hoverBg: isSelected ? undefined : 'slate-700/50',
      iconColor: isSelected ? 'cyan-400' : 'slate-400',
      accentColor: 'cyan-400',
      shadowColor: 'cyan-500/20',
    }
  }
  
  // Production
  return {
    borderColor: isSelected ? 'orange-400' : 'slate-700',
    bgColor: isSelected ? 'orange-500/20' : 'slate-700/30',
    bgGradient: isSelected ? 'from-orange-500/20 to-orange-600/10' : undefined,
    textColor: isSelected ? 'orange-300' : 'slate-300',
    hoverBorder: isSelected ? 'orange-300' : 'orange-400/50',
    hoverBg: isSelected ? undefined : 'slate-700/50',
    iconColor: isSelected ? 'orange-400' : 'slate-400',
    accentColor: 'orange-400',
    shadowColor: 'orange-500/20',
  }
}

/**
 * Construye una clase CSS condicional para un botón/card de ambiente
 * @param envName - Nombre del ambiente
 * @param isSelected - Si está seleccionado
 * @returns String con clases Tailwind
 * @example
 * className={buildEnvCardClass('Quality', isSelected)}
 */
export function buildEnvCardClass(envName: 'Quality' | 'Production', isSelected: boolean): string {
  const config = getEnvColorConfig(envName, isSelected)
  const base = 'flex items-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all transform'
  const border = `border-${config.borderColor}`
  const bg = config.bgGradient ? `bg-gradient-to-br ${config.bgGradient}` : `bg-${config.bgColor}`
  const hover = `hover:border-${config.hoverBorder}` + (config.hoverBg ? ` hover:bg-${config.hoverBg}` : '')
  const scale = isSelected ? 'scale-105' : ''
  
  return `${base} ${border} ${bg} ${hover} ${scale}`
}

/**
 * Obtiene la lista de pipelines de una selección de ambiente, con fallback seguro
 * @param selectedByEnv - Registro de selecciones
 * @param envName - Nombre del ambiente
 * @returns Array de pipelines seleccionados (nunca undefined)
 * @example
 * const selected = getSelectedPipelines(selectedByEnv, 'Quality')
 */
export function getSelectedPipelines(selectedByEnv: Record<string, any[]>, envName: string) {
  return selectedByEnv[envName] ?? []
}

/**
 * Verifica si un pipeline específico está seleccionado
 * @param selectedByEnv - Registro de selecciones
 * @param envName - Nombre del ambiente
 * @param pipelineName - Nombre del pipeline
 * @returns true si está seleccionado
 * @example
 * if (isPipelineSelected(selectedByEnv, 'Quality', 'Build-A')) { ... }
 */
export function isPipelineSelected(
  selectedByEnv: Record<string, any[]>,
  envName: string,
  pipelineName: string
): boolean {
  const pipelines = getSelectedPipelines(selectedByEnv, envName)
  return pipelines.some(p => p.name === pipelineName)
}

/**
 * Obtiene la entrada de selección de un pipeline específico
 * @param selectedByEnv - Registro de selecciones
 * @param envName - Nombre del ambiente
 * @param pipelineName - Nombre del pipeline
 * @returns Entrada del pipeline o undefined
 * @example
 * const entry = getSelectedPipelineEntry(selectedByEnv, 'Quality', 'Build-A')
 */
export function getSelectedPipelineEntry(
  selectedByEnv: Record<string, any[]>,
  envName: string,
  pipelineName: string
): any {
  const pipelines = getSelectedPipelines(selectedByEnv, envName)
  return pipelines.find(p => p.name === pipelineName)
}

/**
 * Obtiene los parámetros de un pipeline, manejando tanto 'parameters' como 'paramaters' (typo)
 * @param pipeline - Objeto del pipeline
 * @returns Array de parámetros (nunca undefined)
 * @example
 * const params = getPipelineParameters(pipeline)
 */
export function getPipelineParameters(pipeline: any): any[] {
  return (pipeline as any).parameters ?? (pipeline as any).paramaters ?? []
}
