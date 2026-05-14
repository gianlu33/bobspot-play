import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { fetchLevels, fetchLevelInfo, type LevelInfo } from '../api'
import { LevelCard } from './LevelCard'
import { InfoModal } from './InfoModal'

interface LevelSelectProps {
  onSelectLevel: (level: LevelInfo) => void
}

export function LevelSelect({ onSelectLevel }: LevelSelectProps) {
  const [levels, setLevels] = useState<LevelInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  useEffect(() => {
    async function loadLevels() {
      try {
        const levelIds = await fetchLevels()
        const levelInfos = await Promise.all(levelIds.map(fetchLevelInfo))
        setLevels(levelInfos)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load levels')
      } finally {
        setLoading(false)
      }
    }
    void loadLevels()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Select a Level</h2>
        <button
          onClick={() => setIsInfoOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-surface-700 hover:bg-surface-600 border border-border-default rounded-lg transition-colors text-text-secondary hover:text-text-primary"
        >
          <Info className="w-4 h-4" />
          How to Play
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            onSelect={() => onSelectLevel(level)}
          />
        ))}
      </div>

      <InfoModal 
        isOpen={isInfoOpen} 
        onClose={() => setIsInfoOpen(false)} 
      />
    </div>
  )
}
