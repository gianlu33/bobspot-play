import { GameCard, type Game } from './GameCard'
import { PlaceholderCard } from './PlaceholderCard'

interface GameGridProps {
  games: Game[]
}

export function GameGrid({ games }: GameGridProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
      <PlaceholderCard />
    </section>
  )
}
