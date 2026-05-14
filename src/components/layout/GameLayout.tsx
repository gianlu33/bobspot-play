import type { ReactNode } from 'react'

interface GameLayoutProps {
  header: ReactNode
  statusBar?: ReactNode
  mainContent: ReactNode
  sidebar?: ReactNode
  mobileMainHeight?: string
}

export function GameLayout({
  header,
  statusBar,
  mainContent,
  sidebar,
  mobileMainHeight = '500px',
}: GameLayoutProps) {
  return (
    <>
      {/* Desktop layout: fixed viewport height with grid */}
      <div className="hidden lg:grid lg:grid-rows-[auto_auto_1fr] lg:h-[calc(100vh-8rem)]">
        {header}
        {statusBar}
        <div className={`grid ${sidebar ? 'grid-cols-[1fr_18rem]' : 'grid-cols-1'} gap-4 min-h-0`}>
          {mainContent}
          {sidebar && (
            <div className="overflow-y-auto">
              {sidebar}
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout: natural flow, scrolls with page */}
      <div className="lg:hidden">
        {header}
        {statusBar}
        <div style={{ height: mobileMainHeight }}>
          {mainContent}
        </div>
        {sidebar && (
          <div className="mt-4">
            {sidebar}
          </div>
        )}
      </div>
    </>
  )
}
