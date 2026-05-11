export function PlaceholderCard() {
  return (
    <article className="group relative bg-bg-card backdrop-blur-sm border border-dashed border-border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[240px]">
      <div className="w-12 h-12 rounded-xl bg-bg-card-hover flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <p className="text-text-muted text-sm">More games coming...</p>
    </article>
  )
}
