import { useEffect, useState } from 'react'
import { fetchLevels, fetchLevelInfo, type LevelInfo } from '../api'
import { LevelCard } from './LevelCard'

interface LevelSelectProps {
  onSelectLevel: (level: LevelInfo) => void
}

export function LevelSelect({ onSelectLevel }: LevelSelectProps) {
  const [levels, setLevels] = useState<LevelInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <h2 className="text-2xl font-bold mb-6">Select a Level</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            onSelect={() => onSelectLevel(level)}
          />
        ))}
      </div>
    </div>
  )
}
