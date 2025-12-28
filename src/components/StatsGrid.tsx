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
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Heart,
      label: "FC Máxima",
      value: stats.maxHeartRate,
      unit: "bpm",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Activity,
      label: "FC Media",
      value: stats.avgHeartRate,
      unit: "bpm",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Waves,
      label: "Brazadas",
      value: stats.strokes.toLocaleString(),
      unit: "total",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Gauge,
      label: "Velocidad Media Brazada",
      value: stats.avgStrokeSpeed,
      unit: "m/s",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: MapPin,
      label: "Distancia Recorrida",
      value: stats.distance,
      unit: "km",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {statItems.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className="bg-slate-800/30 border-slate-700/50 p-5 hover:bg-slate-800/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.bgColor} p-2.5 rounded-lg`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
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
