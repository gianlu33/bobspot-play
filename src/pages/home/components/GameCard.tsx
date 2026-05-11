export interface Game {
  id: string
  title: string
  description: string
  status: 'available' | 'coming-soon'
  tags: string[]
}

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="group relative bg-bg-card backdrop-blur-sm border border-border-default rounded-2xl p-6 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300">
      {game.status === 'coming-soon' && (
        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30">
          Coming Soon
        </span>
      )}
      
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-300 transition-colors">
          {game.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {game.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-surface-800 text-text-secondary rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
