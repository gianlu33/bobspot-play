export function PlaceholderCard() {
  return (
    <article className="group relative bg-white/5 backdrop-blur-sm border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[240px]">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <p className="text-slate-500 text-sm">More games coming...</p>
    </article>
  )
}
