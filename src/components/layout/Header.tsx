export function Header() {
  return (
    <header className="border-b border-border-default backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="https://bobspot.org" className="text-sm text-primary-300 hover:text-primary-200 transition-colors">
          ← bobspot.org
        </a>
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-primary-400">bobspot</span>
          <span className="text-text-primary">.play</span>
        </h1>
        <div className="w-20" />
      </div>
    </header>
  )
}
