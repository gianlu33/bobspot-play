interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </section>
  )
}
