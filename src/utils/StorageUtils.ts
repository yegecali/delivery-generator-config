/**
 * Clave para almacenar el estado en localStorage
 */
const STORAGE_KEY = 'generator-config-state'

/**
 * Interfaz del estado que se persiste en localStorage
 */
export interface PersistedState {
  config: {
    configFileName: string | null
    config: any | null
  }
  selection: {
    selectedEnv: 'Quality' | 'Production'
    selectedByEnv: Record<string, any[]>
  }
}

/**
 * Guarda el estado en localStorage
 * @param key - Clave para almacenar
 * @param state - Estado a guardar
 */
export function saveToLocalStorage(state: PersistedState): void {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch (err) {
    console.error('Error saving to localStorage:', err)
  }
}

/**
 * Carga el estado desde localStorage
 * @returns Estado guardado o null si no existe
 */
export function loadFromLocalStorage(): PersistedState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (serialized === null) {
      return null
    }
    return JSON.parse(serialized) as PersistedState
  } catch (err) {
    console.error('Error loading from localStorage:', err)
    return null
  }
}

/**
 * Limpia el estado guardado en localStorage
 */
export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Error clearing localStorage:', err)
  }
}

/**
 * Verifica si hay estado guardado en localStorage
 * @returns true si hay estado guardado
 */
export function hasPersistedState(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch (err) {
    return false
  }
}
