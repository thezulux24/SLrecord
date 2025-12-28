import { Card } from "./ui/card"
import { Flame, Heart, Waves, Route, Activity, Timer } from "lucide-react"

interface StatsGridProps {
  stats: {
    distance: number
    strokes: number
    calories: number
    avgPace: number
    avgHeartRate: number
  }
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const pools = Math.floor(stats.distance / 25)
  
  const statItems = [
    {
      icon: Route,
      label: "Distancia Total",
      value: stats.distance.toLocaleString(),
      unit: "m",
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      shadow: "shadow-green-500/20",
    },
    {
      icon: Waves,
      label: "Número de Piscinas",
      value: pools.toLocaleString(),
      unit: "× 25m",
      color: "text-cyan-500",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-teal-500/20",
      shadow: "shadow-cyan-500/20",
    },
    {
      icon: Waves,
      label: "Brazadas Totales",
      value: stats.strokes.toLocaleString(),
      unit: "total",
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      shadow: "shadow-blue-500/20",
    },
    {
      icon: Flame,
      label: "Calorías Totales",
      value: stats.calories.toLocaleString(),
      unit: "kcal",
      color: "text-orange-500",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      shadow: "shadow-orange-500/20",
    },
    {
      icon: Timer,
      label: "Ritmo Medio",
      value: stats.avgPace.toFixed(2),
      unit: "min/100m",
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      shadow: "shadow-purple-500/20",
    },
    {
      icon: Activity,
      label: "Frecuencia Cardíaca Media",
      value: stats.avgHeartRate,
      unit: "bpm",
      color: "text-pink-500",
      bgColor: "bg-gradient-to-br from-pink-500/20 to-red-500/20",
      shadow: "shadow-pink-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {statItems.map((stat, index) => (
        <Card
          key={index}
          className="bg-slate-800/30 border-slate-700/50 p-3 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`${stat.bgColor} ${stat.shadow} p-2 rounded-lg shadow-lg backdrop-blur-sm border border-white/10`}>
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} strokeWidth={2.5} />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-slate-400 font-medium leading-tight">{stat.label}</div>
            <div className="flex items-baseline gap-1">
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.unit}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
