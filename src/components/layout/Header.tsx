export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="https://bobspot.org" className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
          ← bobspot.org
        </a>
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-purple-400">bobspot</span>
          <span className="text-white">.play</span>
        </h1>
        <div className="w-20" />
      </div>
    </header>
  )
}
