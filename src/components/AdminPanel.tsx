import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Play, Pause, RotateCcw, Save } from 'lucide-react'

interface Stats {
  calories: number
  maxHeartRate: number
  avgHeartRate: number
  strokes: number
  avgStrokeSpeed: number
  distance: number
}

interface SwimData {
  elapsedTime: number
  isRunning: boolean
  stats: Stats
  startTime: number | null
}

export default function AdminPanel() {
  const [swimData, setSwimData] = useState<SwimData>({
    elapsedTime: 0,
    isRunning: false,
    stats: {
      calories: 0,
      maxHeartRate: 0,
      avgHeartRate: 0,
      strokes: 0,
      avgStrokeSpeed: 0,
      distance: 0,
    },
    startTime: null,
  })

  const [timeInput, setTimeInput] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const TOTAL_DURATION = 12 * 60 * 60 // 12 horas en segundos

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('swimData')
    if (saved) {
      const parsed = JSON.parse(saved)
      setSwimData(parsed)
      updateTimeInput(parsed.elapsedTime)
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: number | undefined

    if (swimData.isRunning && swimData.startTime) {
      interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - swimData.startTime!) / 1000) + (swimData.elapsedTime || 0)
        
        // Detener automáticamente al llegar a 12 horas
        if (elapsed >= TOTAL_DURATION) {
          setSwimData(prev => {
            const updated = { 
              ...prev, 
              elapsedTime: TOTAL_DURATION,
              isRunning: false,
              startTime: null
            }
            localStorage.setItem('swimData', JSON.stringify(updated))
            return updated
          })
          if (interval) clearInterval(interval)
        } else {
          setSwimData(prev => {
            const updated = { ...prev, elapsedTime: elapsed }
            localStorage.setItem('swimData', JSON.stringify(updated))
            return updated
          })
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [swimData.isRunning, swimData.startTime, TOTAL_DURATION])

  const updateTimeInput = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    setTimeInput({ hours, minutes, seconds })
  }

  const handleStartPause = () => {
    setSwimData(prev => {
      const updated = {
        ...prev,
        isRunning: !prev.isRunning,
        startTime: !prev.isRunning ? Date.now() : prev.startTime,
      }
      localStorage.setItem('swimData', JSON.stringify(updated))
      return updated
    })
  }

  const handleReset = () => {
    const resetData: SwimData = {
      elapsedTime: 0,
      isRunning: false,
      stats: {
        calories: 0,
        maxHeartRate: 0,
        avgHeartRate: 0,
        strokes: 0,
        avgStrokeSpeed: 0,
        distance: 0,
      },
      startTime: null,
    }
    setSwimData(resetData)
    setTimeInput({ hours: 0, minutes: 0, seconds: 0 })
    localStorage.setItem('swimData', JSON.stringify(resetData))
  }

  const handleTimeChange = () => {
    const totalSeconds = timeInput.hours * 3600 + timeInput.minutes * 60 + timeInput.seconds
    setSwimData(prev => {
      const updated = { ...prev, elapsedTime: totalSeconds }
      localStorage.setItem('swimData', JSON.stringify(updated))
      return updated
    })
  }

  const handleStatChange = (key: keyof Stats, value: number) => {
    setSwimData(prev => ({
      ...prev,
      stats: { ...prev.stats, [key]: value },
    }))
  }

  const handleSaveStats = () => {
    localStorage.setItem('swimData', JSON.stringify(swimData))
    alert('Estadísticas guardadas!')
  }

  const progress = Math.min((swimData.elapsedTime / (12 * 60 * 60)) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administrador</h1>
          <p className="text-slate-400">Control del evento de natación</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Control de Tiempo */}
          <Card className="bg-slate-900/50 border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Control de Tiempo</h2>
            
            {/* Display actual */}
            <div className="bg-slate-800/50 p-6 rounded-lg mb-6">
              <div className="text-sm text-slate-400 mb-2">TIEMPO ACTUAL</div>
              <div className="text-5xl font-mono font-bold text-white mb-2">
                {String(Math.floor(swimData.elapsedTime / 3600)).padStart(2, '0')}:
                {String(Math.floor((swimData.elapsedTime % 3600) / 60)).padStart(2, '0')}:
                {String(swimData.elapsedTime % 60).padStart(2, '0')}
              </div>
              <div className="text-sm text-slate-400">Progreso: {progress.toFixed(1)}%</div>
            </div>

            {/* Controles de inicio/pausa */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleStartPause}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  swimData.isRunning
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {swimData.isRunning ? (
                  <>
                    <Pause className="w-5 h-5" /> Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" /> Iniciar
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Reiniciar
              </button>
            </div>

            {/* Ajuste manual de tiempo */}
            <div className="border-t border-slate-700 pt-6">
              <div className="text-sm text-slate-400 mb-3">AJUSTE MANUAL DE TIEMPO</div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Horas</label>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    value={timeInput.hours}
                    onChange={(e) => setTimeInput({ ...timeInput, hours: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Minutos</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={timeInput.minutes}
                    onChange={(e) => setTimeInput({ ...timeInput, minutes: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Segundos</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={timeInput.seconds}
                    onChange={(e) => setTimeInput({ ...timeInput, seconds: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
              <button
                onClick={handleTimeChange}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Aplicar Tiempo
              </button>
            </div>
          </Card>

          {/* Control de Estadísticas */}
          <Card className="bg-slate-900/50 border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Estadísticas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Calorías (kcal)</label>
                <input
                  type="number"
                  value={swimData.stats.calories}
                  onChange={(e) => handleStatChange('calories', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">FC Máxima (bpm)</label>
                <input
                  type="number"
                  value={swimData.stats.maxHeartRate}
                  onChange={(e) => handleStatChange('maxHeartRate', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">FC Media (bpm)</label>
                <input
                  type="number"
                  value={swimData.stats.avgHeartRate}
                  onChange={(e) => handleStatChange('avgHeartRate', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Brazadas (total)</label>
                <input
                  type="number"
                  value={swimData.stats.strokes}
                  onChange={(e) => handleStatChange('strokes', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Velocidad Media Brazada (m/s)</label>
                <input
                  type="number"
                  step="0.01"
                  value={swimData.stats.avgStrokeSpeed}
                  onChange={(e) => handleStatChange('avgStrokeSpeed', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Distancia Recorrida (km)</label>
                <input
                  type="number"
                  step="0.01"
                  value={swimData.stats.distance}
                  onChange={(e) => handleStatChange('distance', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>

              <button
                onClick={handleSaveStats}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" /> Guardar Estadísticas
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
