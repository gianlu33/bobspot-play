import type { LevelInfo } from '../api'

interface LevelCardProps {
  level: LevelInfo
  onSelect: () => void
}

export function LevelCard({ level, onSelect }: LevelCardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-bg-card backdrop-blur-sm border border-border-default rounded-xl p-5 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300 group"
    >
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-300 transition-colors">
        {level.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
        {level.description}
      </p>
    </button>
  )
}
