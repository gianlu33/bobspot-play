import { useState } from 'react'
import { type LevelInfo } from './api'
import { LevelSelect } from './components/LevelSelect'
import { GameScreen } from './components/GameScreen'

export function SocialEnginePage() {
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo | null>(null)

  return (
    <main className={`max-w-6xl mx-auto px-6 py-8 ${selectedLevel ? 'lg:h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col' : ''}`}>
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
          onBack={() => setSelectedLevel(null)}
        />
      ) : (
        <LevelSelect onSelectLevel={setSelectedLevel} />
      )}
    </main>
  )
}
