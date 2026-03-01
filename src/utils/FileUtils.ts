/**
 * Descarga un objeto JSON como archivo
 * @param payload - Objeto a descargar
 * @param filename - Nombre del archivo (default: 'download.json')
 * @example
 * downloadJSON({ data: 'test' }, 'myfile.json')
 */
export function downloadJSON(payload: unknown, filename = 'download.json'): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/**
 * Lee un archivo como texto
 * @param file - Archivo a leer
 * @returns Promesa que resuelve con el contenido del archivo
 * @example
 * const text = await readFileAsText(file)
 */
export async function readFileAsText(file: File): Promise<string> {
  return file.text()
}

/**
 * Parsea un archivo JSON con manejo de errores
 * @param file - Archivo JSON a parsear
 * @returns Promesa con { success: true, data } o { success: false, error }
 * @example
 * const result = await parseJSONFile(file)
 * if (result.success) {
 *   console.log(result.data)
 * } else {
 *   console.error(result.error)
 * }
 */
export async function parseJSONFile(file: File): Promise<
  { success: true; data: any } | { success: false; error: string }
> {
  try {
    const text = await readFileAsText(file)
    const data = JSON.parse(text)
    return { success: true, data }
  } catch (err) {
    return { success: false, error: 'Error leyendo o parseando el archivo JSON' }
  }
}

/**
 * Valida que un archivo sea JSON
 * @param file - Archivo a validar
 * @returns true si es JSON
 */
export function isJSONFile(file: File): boolean {
  return file.type === 'application/json' || file.name.endsWith('.json')
}

/**
 * Obtiene el nombre del archivo sin extensión
 * @param filename - Nombre completo del archivo
 * @returns Nombre sin extensión
 * @example
 * getFileNameWithoutExtension('config.json') // → 'config'
 */
export function getFileNameWithoutExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot === -1 ? filename : filename.substring(0, lastDot)
}

/**
 * Obtiene la extensión de un archivo
 * @param filename - Nombre completo del archivo
 * @returns Extensión del archivo (sin el punto)
 * @example
 * getFileExtension('config.json') // → 'json'
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot === -1 ? '' : filename.substring(lastDot + 1)
}

/**
 * Formatea el tamaño de un archivo a formato legible
 * @param bytes - Tamaño en bytes
 * @returns Tamaño formateado (ej: '1.5 MB')
 * @example
 * formatFileSize(1024000) // → '1.00 MB'
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
