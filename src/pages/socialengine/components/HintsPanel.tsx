import { useState } from 'react'

interface HintsPanelProps {
  hints: string[]
}

export function HintsPanel({ hints }: HintsPanelProps) {
  const [revealedCount, setRevealedCount] = useState(0)

  if (hints.length === 0) return null

  return (
    <div className="bg-surface-800/50 border border-border-default rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-text-secondary">Hints</h4>
        {revealedCount < hints.length && (
          <button
            onClick={() => setRevealedCount((c) => c + 1)}
            className="text-xs px-2 py-1 bg-primary-600/20 text-primary-300 rounded hover:bg-primary-600/30 transition-colors"
          >
            Reveal Hint ({revealedCount}/{hints.length})
          </button>
        )}
      </div>
      
      {revealedCount > 0 ? (
        <ul className="space-y-2">
          {hints.slice(0, revealedCount).map((hint, i) => (
            <li key={i} className="text-sm text-text-secondary flex gap-2">
              <span className="text-primary-400">•</span>
              {hint}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-text-muted italic">Click to reveal hints if you're stuck</p>
      )}
    </div>
  )
}
