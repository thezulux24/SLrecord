import { Card } from "./ui/card"
import { Activity, Flame, Heart, Waves, Gauge, MapPin } from "lucide-react"

interface StatsGridProps {
  stats: {
    calories: number
    maxHeartRate: number
    avgHeartRate: number
    strokes: number
    avgStrokeSpeed: number
    distance: number
  }
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      icon: Flame,
      label: "Calorías",
      value: stats.calories.toLocaleString(),
      unit: "kcal",
      color: "text-orange-500",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400",
      shadow: "shadow-orange-500/20",
    },
    {
      icon: Heart,
      label: "FC Máxima",
      value: stats.maxHeartRate,
      unit: "bpm",
      color: "text-red-500",
      bgColor: "bg-gradient-to-br from-red-500/20 to-pink-500/20",
      iconColor: "text-red-400",
      shadow: "shadow-red-500/20",
    },
    {
      icon: Activity,
      label: "FC Media",
      value: stats.avgHeartRate,
      unit: "bpm",
      color: "text-pink-500",
      bgColor: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
      iconColor: "text-pink-400",
      shadow: "shadow-pink-500/20",
    },
    {
      icon: Waves,
      label: "Brazadas",
      value: stats.strokes.toLocaleString(),
      unit: "total",
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      shadow: "shadow-blue-500/20",
    },
    {
      icon: Gauge,
      label: "Velocidad Media Brazada",
      value: stats.avgStrokeSpeed,
      unit: "m/s",
      color: "text-cyan-500",
      bgColor: "bg-gradient-to-br from-cyan-500/20 to-teal-500/20",
      iconColor: "text-cyan-400",
      shadow: "shadow-cyan-500/20",
    },
    {
      icon: MapPin,
      label: "Distancia Recorrida",
      value: stats.distance,
      unit: "km",
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400",
      shadow: "shadow-green-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {statItems.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className="bg-slate-800/30 border-slate-700/50 p-5 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.bgColor} ${stat.shadow} p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/10`}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${stat.iconColor} drop-shadow-lg`} strokeWidth={2.5} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tabular-nums">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.unit}</div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
