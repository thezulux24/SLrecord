import { useEffect, useState } from "react"

interface SwimmingProgressBarProps {
  progress: number
}

export default function SwimmingProgressBar({ progress }: SwimmingProgressBarProps) {
  const [waves, setWaves] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWaves((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full">
      {/* Progress Bar Container */}
      <div className="relative h-32 sm:h-36 lg:h-40 bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner">
        {/* Water Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Animated waves */}
          <div className="absolute inset-0 opacity-40">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path
                d={`M0,16 Q${waves % 100},${8 + Math.sin(waves * 0.1) * 4} 100,16 T200,16 V40 H0 Z`}
                fill="url(#wave-gradient)"
                className="animate-wave"
              />
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Swimmer Icon */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-10"
          style={{ left: `calc(${Math.max(progress - 2, 0)}% + 1rem)` }}
        >
          <div className="relative animate-swim">
            <img
              src="/swimmer-icon.png"
              alt="Nadador"
              className="drop-shadow-2xl w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
            />
          </div>
        </div>

        {/* Lane markers */}
        <div className="absolute inset-0 flex items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-1 bg-white/10 flex-1 mx-1" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Start and End Markers */}
      <div className="flex justify-between mt-3 px-2 text-sm font-medium">
        <span className="text-green-400">INICIO</span>
        <span className="text-red-400">META (12h)</span>
      </div>
    </div>
  )
}
