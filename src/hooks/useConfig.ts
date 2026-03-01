import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setConfigFileName, setConfig, setConfigError } from '../redux/slices/configSlice'
import { isValidConfigMvp } from '../models/ConfigMvp'

export function useConfig() {
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  
  const { configFileName, config, configError } = useSelector((state: RootState) => state.config)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement> | File) => {
    dispatch(setConfig(null))
    dispatch(setConfigError(null))
    dispatch(setConfigFileName(null))
    const fileObj = (e as any).target ? (e as any).target.files?.[0] : (e as File)
    const file = fileObj
    if (!file) return
    dispatch(setConfigFileName(file.name))
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      if (!isValidConfigMvp(parsed)) {
        dispatch(setConfigError('El JSON no cumple el formato ConfigMvp requerido'))
        return
      }
      dispatch(setConfig(parsed))
      dispatch(setConfigError(null))
    } catch (err) {
      dispatch(setConfigError('Error leyendo o parseando el archivo JSON'))
    }
  }

  const triggerFileInput = () => fileInputRef.current?.click()

  return {
    fileInputRef,
    configFileName,
    config,
    configError,
    handleFile,
    triggerFileInput,
    setConfig: (cfg: any) => dispatch(setConfig(cfg))
  }
}
