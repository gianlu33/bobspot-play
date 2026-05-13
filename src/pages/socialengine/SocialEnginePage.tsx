import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { LevelInfo, GameConfig } from './api'
import { fetchConfig } from './api'
import { LevelSelect } from './components/LevelSelect'
import { GameScreen } from './components/GameScreen'

const DEFAULT_CONFIG: GameConfig = {
  max_message_length: 500,
  max_conversation_turns: 3,
}

export function SocialEnginePage() {
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo | null>(null)
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG)

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch(() => {})
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          to="/"
          className="text-text-secondary hover:text-text-primary transition-colors text-sm"
        >
          ← Back to Games
        </Link>
      </nav>

      {/* Title */}
      {!selectedLevel && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">SocialEngine AI</h1>
          <p className="text-text-secondary">
            Hack people, not code. Use social engineering to extract secrets from AI guardians.
          </p>
        </div>
      )}

      {/* Content */}
      {selectedLevel ? (
        <GameScreen
          level={selectedLevel}
          config={config}
          onBack={() => setSelectedLevel(null)}
        />
      ) : (
        <LevelSelect onSelectLevel={setSelectedLevel} />
      )}
    </main>
  )
}
