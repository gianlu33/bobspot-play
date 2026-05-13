interface VictoryModalProps {
  levelTitle: string
  onPlayAgain: () => void
  onSelectLevel: () => void
}

export function VictoryModal({ levelTitle, onPlayAgain, onSelectLevel }: VictoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface-800 border border-border-default rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-green-400">Secret Unlocked!</h2>
        <p className="text-text-secondary mb-6">
          You successfully convinced the Guardian in <span className="text-text-primary font-medium">{levelTitle}</span>
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 px-4 py-3 bg-surface-700 hover:bg-surface-600 rounded-xl transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onSelectLevel}
            className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl transition-colors"
          >
            Select Level
          </button>
        </div>
      </div>
    </div>
  )
}
