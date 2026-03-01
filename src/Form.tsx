import React from 'react'
import { FiFileText, FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import LoadButton from './components/LoadButton'
import EnvSelector from './components/EnvSelector'
import PipelineList from './components/PipelineList'
import Preview from './components/Preview'
import { RootState } from './redux/store'
import { setConfigFileName, setConfig, setConfigError, resetConfig } from './redux/slices/configSlice'
import { setSelectedEnv, togglePipeline, setParamValue } from './redux/slices/selectionSlice'
import { isValidConfigMvp } from './models/ConfigMvp'
import { DeliveryConfig, DeliveryEnvConfig, DeliveryPipeline, DeliveryPipelineParameter } from './models/Delivery'
import { downloadJSON, parseJSONFile } from './utils/FileUtils'
import { getSelectedPipelines } from './utils/StringUtils'

export default function Form(): JSX.Element {
  const dispatch = useDispatch()
  const [generated, setGenerated] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const { configFileName, config, configError } = useSelector((state: RootState) => state.config)
  const { selectedEnv, selectedByEnv } = useSelector((state: RootState) => state.selection)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement> | File) => {
    dispatch(setConfig(null))
    dispatch(setConfigError(null))
    dispatch(setConfigFileName(null))

    const fileObj = (e as any).target ? (e as any).target.files?.[0] : (e as File)
    if (!fileObj) return

    dispatch(setConfigFileName(fileObj.name))

    const result = await parseJSONFile(fileObj)
    if (!result.success) {
      dispatch(setConfigError(result.error))
      return
    }

    if (!isValidConfigMvp(result.data)) {
      dispatch(setConfigError('El JSON no cumple el formato ConfigMvp requerido'))
      return
    }

    dispatch(setConfig(result.data))
    dispatch(setConfigError(null))
  }

  const triggerFileInput = () => fileInputRef.current?.click()

  const buildDelivery = (config: any): DeliveryConfig => {
    const buildEnv = (envName: 'Quality' | 'Production'): DeliveryEnvConfig => ({
      name: config[envName].name,
      pipelinesBuilding: getSelectedPipelines(selectedByEnv, envName),
      pipelinesReverse: []
    })
    return { Quality: buildEnv('Quality'), Production: buildEnv('Production') }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!config) return
    setGenerated(true)
    const delivery: DeliveryConfig = buildDelivery(config)
    downloadJSON(delivery, 'delivery.json')
  }

  return (
    <div>
      <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleFile as any} style={{ display: 'none' }} />

      {!config ? (
        <div className="flex items-center justify-center min-h-96 sm:min-h-80">
          <div className="w-full max-w-md">
            <LoadButton fileInputRef={fileInputRef} onChange={handleFile as any} trigger={triggerFileInput} />
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full mb-6 shadow-2xl shadow-cyan-500/50">
                <FiFileText size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-orange-400 bg-clip-text text-transparent mb-3">Comienza aquí</h2>
              <p className="text-cyan-200 mb-2 text-lg font-semibold">Sube tu archivo ConfigMvp en formato JSON</p>
              <p className="text-slate-400 text-sm">El archivo será validado automáticamente</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Config Header */}
          <div className="mb-6 pb-6 border-b border-cyan-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-cyan-300/70 mb-2 uppercase tracking-wider font-semibold">Configuración cargada</p>
                <p className="text-lg font-bold text-cyan-100 break-all">{configFileName}</p>
                {config && !configError && (
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-emerald-300 text-sm rounded-full border border-emerald-400/50">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full">
                      <span className="text-white text-xs font-bold">✓</span>
                    </span>
                    Válida
                  </div>
                )}
              </div>
              <button 
                type="button" 
                onClick={() => triggerFileInput()} 
                className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-slate-600 to-slate-700 text-orange-300 rounded-lg hover:from-slate-500 hover:to-slate-600 transition-all border border-slate-500/50 hover:border-orange-400/50"
              >
                Cambiar
              </button>
              <button 
                type="button" 
                onClick={() => dispatch(resetConfig())} 
                className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-red-600/80 to-red-700/80 text-red-100 rounded-lg hover:from-red-600 hover:to-red-700 transition-all border border-red-500/50 hover:border-red-400/50 flex items-center gap-2"
                title="Eliminar configuración y localStorage"
              >
                <FiTrash2 size={16} />
                Limpiar
              </button>
            </div>
            {configError && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 text-red-300 text-sm rounded-lg">
                {configError}
              </div>
            )}
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Environment Selector */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-800 rounded-xl border border-cyan-500/30 p-6">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4">👤 Ambiente de ejecución</h3>
              <EnvSelector selectedEnv={selectedEnv} setSelectedEnv={(env) => dispatch(setSelectedEnv(env))} />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Pipelines */}
              <div className="lg:col-span-2 space-y-6">
                {/* Environment Header */}
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl p-6 text-white shadow-lg shadow-cyan-500/20">
                  <h2 className="text-2xl font-black mb-1">{selectedEnv}</h2>
                  <p className="text-cyan-100 font-semibold">{config[selectedEnv].name}</p>
                </div>

                {/* Pipelines Building */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-800 rounded-xl border border-cyan-500/30 p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-5 flex items-center gap-3">
                    <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></span>
                    🚀 Pipelines Building
                  </h3>
                  <PipelineList 
                    envName={selectedEnv} 
                    list={config[selectedEnv].pipelinesBuilding} 
                    selectedByEnv={selectedByEnv} 
                    togglePipeline={(env, p) => dispatch(togglePipeline({ envName: env, pipeline: p }))}
                    setParamValue={(env, pname, paramname, value) => dispatch(setParamValue({ envName: env, pipelineName: pname, paramName: paramname, value }))}
                  />
                  {config[selectedEnv].pipelinesBuilding.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No hay pipelines disponibles</p>
                  )}
                </div>

                {/* Pipelines Reverse */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-800 rounded-xl border border-orange-500/30 p-6">
                  <h3 className="text-lg font-bold text-orange-300 mb-5 flex items-center gap-3">
                    <span className="inline-block w-3 h-3 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"></span>
                    ⚙️ Pipelines Reverse
                  </h3>
                  <PipelineList 
                    envName={selectedEnv} 
                    list={config[selectedEnv].pipelinesReverse} 
                    selectedByEnv={selectedByEnv} 
                    togglePipeline={(env, p) => dispatch(togglePipeline({ envName: env, pipeline: p }))}
                    setParamValue={(env, pname, paramname, value) => dispatch(setParamValue({ envName: env, pipelineName: pname, paramName: paramname, value }))}
                  />
                  {config[selectedEnv].pipelinesReverse.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No hay pipelines disponibles</p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform active:scale-95 text-lg"
                >
                  {generated ? '✅ Descargado correctamente' : '⬇️ Generar y Descargar'}
                </button>
              </div>

              {/* Right Column - Preview */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Preview delivery={buildDelivery(config)} />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
