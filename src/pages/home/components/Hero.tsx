interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-xl text-text-secondary max-w-2xl mx-auto">
        {subtitle}
      </p>
    </section>
  )
}
