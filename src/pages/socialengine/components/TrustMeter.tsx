interface TrustMeterProps {
  level: number
}

export function TrustMeter({ level }: TrustMeterProps) {
  const percentage = (level / 10) * 100

  const getColor = () => {
    if (level >= 8) return 'bg-green-500'
    if (level >= 5) return 'bg-yellow-500'
    if (level >= 3) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-secondary uppercase tracking-wide">Trust</span>
      <div className="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-mono text-text-secondary w-8 text-right">{level}</span>
    </div>
  )
}
