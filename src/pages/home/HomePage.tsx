import { Hero } from './components/Hero'
import { GameGrid } from './components/GameGrid'
import type { Game } from './components/GameCard'

const games: Game[] = [
  {
    id: 'socialengine',
    title: 'SocialEngine AI',
    description: 'Hack people, not code. Use social engineering to extract secrets from AI guardians.',
    status: 'available',
    tags: ['AI', 'Social Engineering', 'Puzzle'],
  },
]

export function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Hero
        title="Games & Experiments"
        subtitle="A collection of games and interactive experiments to challenge your mind."
      />
      <GameGrid games={games} />
    </main>
  )
}
