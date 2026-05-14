import type { ReactNode } from 'react'

interface GameLayoutProps {
  header: ReactNode
  statusBar?: ReactNode
  mainContent: ReactNode
  sidebar?: ReactNode
}

export function GameLayout({
  header,
  statusBar,
  mainContent,
  sidebar,
}: GameLayoutProps) {
  return (
    <>
      {/* Desktop layout: fixed viewport height with grid */}
      <div className="hidden lg:grid lg:grid-rows-[auto_auto_1fr] lg:min-h-0 lg:py-8 gap-4">
        {header}
        {statusBar}
        <div className={`grid ${sidebar ? 'grid-cols-[1fr_18rem]' : 'grid-cols-1'} gap-8 min-h-0`}>
          <div className="flex flex-col min-h-0 overflow-hidden">
            {mainContent}
          </div>
          {sidebar && (
            <div className="overflow-y-auto pt-4 lg:pt-0">
              {sidebar}
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout: natural flow, scrolls with page */}
      <div className="lg:hidden flex flex-col gap-4">
        {header}
        {statusBar}
        <div>
          {mainContent}
        </div>
        {sidebar && (
          <div>
            {sidebar}
          </div>
        )}
      </div>
    </>
  )
}
