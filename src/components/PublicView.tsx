import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import SwimmingProgressBar from './SwimmingProgressBar'
import StatsGrid from './StatsGrid'

interface Stats {
  distance: number
  strokes: number
  calories: number
  avgPace: number
  avgHeartRate: number
}

interface SwimData {
  elapsedTime: number
  isRunning: boolean
  stats: Stats
  startTime: number | null
}

export default function PublicView() {
  const [swimData, setSwimData] = useState<SwimData>({
    elapsedTime: 0,
    isRunning: false,
    stats: {
      distance: 0,
      strokes: 0,
      calories: 0,
      avgPace: 0,
      avgHeartRate: 0,
    },
    startTime: null,
  })
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationDismissed, setCelebrationDismissed] = useState(false)

  const TOTAL_DURATION = 12 * 60 * 60 // 12 horas en segundos

  // Cargar datos del localStorage
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('swimData')
      if (saved) {
        const data = JSON.parse(saved)
        setSwimData(data)
        
        // Mostrar modal si ya está completo y no ha sido cerrado
        if (data.elapsedTime >= TOTAL_DURATION && !celebrationDismissed && !showCelebration) {
          setShowCelebration(true)
        }
      }
    }

    // Cargar inmediatamente
    loadData()

    // Actualizar cada segundo para mantener sincronizado
    const interval = setInterval(loadData, 1000)

    return () => clearInterval(interval)
  }, [TOTAL_DURATION, celebrationDismissed, showCelebration])

  const progress = Math.min((swimData.elapsedTime / TOTAL_DURATION) * 100, 100)

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 lg:p-8">
      {/* Modal de celebración */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-4 border-red-500 rounded-2xl p-8 lg:p-12 max-w-3xl mx-4 shadow-2xl animate-in zoom-in duration-700">
            <div className="text-center space-y-6">
              <div className="text-6xl lg:text-8xl mb-4 animate-bounce">🏆</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                ¡RÉCORD
                <br />
                <span className="text-red-500">COMPLETADO!</span>
              </h2>
              <p className="text-2xl lg:text-3xl text-red-500 font-bold tracking-wider">
                12 HORAS DE NATACIÓN
              </p>
              <p className="text-xl lg:text-2xl text-white font-semibold">
                POR LA EDUCACIÓN
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <p className="text-lg lg:text-xl text-slate-300 font-semibold mb-2">
                  Femenino
                </p>
                <p className="text-3xl lg:text-4xl text-white font-bold">
                  {swimData.stats.distance.toLocaleString()} metros
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-yellow-400 text-xl lg:text-2xl font-bold mb-2">
                  SANTA LIBRADA
                </p>
                <p className="text-slate-300 text-lg">
                  Un logro histórico para nuestra comunidad
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCelebration(false)
                  setCelebrationDismissed(true)
                }}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold tracking-wider transition-colors"
              >
                CONTINUAR
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl p-4 lg:p-6 shadow-2xl w-full">
          {/* Header */}
          <div className="text-center mb-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-0.5 tracking-tight leading-tight">
              RÉCORD POR
              <span className="text-red-500"> SANTA LIBRADA</span>
            </h1>
            <p className="text-red-500 text-sm sm:text-base lg:text-lg font-bold tracking-wider">
              RÉCORD POR LA EDUCACIÓN
            </p>
            <div className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">12 HORAS DE NATACIÓN</div>
          </div>

          {/* Timer */}
          <div className="text-center mb-4">
            <div className="inline-block bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400 mb-0.5 tracking-wider">TIEMPO TRANSCURRIDO</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-white tabular-nums">
                {formatTime(swimData.elapsedTime)}
              </div>
            </div>
          </div>

          {/* Swimming Progress Bar */}
          <SwimmingProgressBar progress={progress} />

          {/* Progress Percentage */}
          <div className="text-center mt-4 mb-4">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{progress.toFixed(1)}%</div>
            <div className="text-slate-400 text-xs sm:text-sm mt-0.5">PROGRESO COMPLETADO</div>
          </div>

          {/* Stats Grid */}
          <StatsGrid stats={swimData.stats} />

          {/* Event Info */}
          <div className="mt-4 pt-3 border-t border-slate-700/50 text-center">
            <div className="text-slate-400 text-xs space-y-0.5">
              <div className="text-yellow-400 font-semibold text-sm">Presencial</div>
              <div className="text-white font-medium text-xs">Piscina Colegio Santa Librada</div>
              <div>Calle 6a #14-40, Cali</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
