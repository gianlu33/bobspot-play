# Bobspot Play

Frontend for [play.bobspot.org](https://play.bobspot.org) - a collection of games and interactive experiments.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** - build tool
- **Tailwind CSS v4** - styling (via `@tailwindcss/vite` plugin)
- **React Router v7** - routing (data router pattern)

## Project Structure

```
src/
├── App.tsx                 # Router setup (createBrowserRouter)
├── main.tsx                # Entry point
├── components/             # Reusable components
│   ├── layout/             # Layout components (Header, Footer, RootLayout, GameLayout)
│   └── ui/                 # Generic UI components (buttons, inputs, etc.)
├── pages/                  # Page components
│   └── [page-name]/        # Each page has its own folder
│       ├── PageName.tsx    # Main page component
│       └── components/     # Page-specific components
└── styles/
    ├── global.css          # Global styles + Tailwind import
    └── theme.css           # Theme variables (colors, fonts, etc.)
```

## Component Organization

- **Generic/reusable components** → `src/components/` (with subfolders like `ui/`, `layout/`)
- **Page-specific components** → `src/pages/[page-name]/components/`

## Layout Components

### GameLayout

A responsive layout for game pages with main content and optional sidebar.

- **Desktop (lg+)**: Fixed viewport height with CSS Grid. Main content and sidebar side by side, both independently scrollable.
- **Mobile**: Natural flow layout. Main content has fixed height, sidebar stacks below and scrolls with page.

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `header` | `ReactNode` | Yes | Header content (back button, title, etc.) |
| `statusBar` | `ReactNode` | No | Status bar below header |
| `mainContent` | `ReactNode` | Yes | Main content area (e.g., chat) |
| `sidebar` | `ReactNode` | No | Sidebar content (hidden if not provided) |
| `mobileMainHeight` | `string` | No | Height of main content on mobile (default: `500px`) |

**Usage:**
```tsx
import { GameLayout } from '@/components/layout/GameLayout'

<GameLayout
  header={<h1>Game Title</h1>}
  statusBar={<StatusBar />}
  mainContent={<ChatArea />}
  sidebar={<Sidebar />}
  mobileMainHeight="600px"
/>
```

## Theming

Colors and design tokens are defined in `src/styles/theme.css` using Tailwind v4's `@theme` directive.

**Available theme variables:**

| Category | Variables | Usage |
|----------|-----------|-------|
| Primary | `primary-50` to `primary-950` | Brand purple colors |
| Accent | `accent-50` to `accent-950` | Pink highlights |
| Surface | `surface-50` to `surface-950` | Background grays |
| Text | `text-primary`, `text-secondary`, `text-muted` | Text colors |
| Background | `bg-base`, `bg-card`, `bg-card-hover` | Background colors |
| Border | `border-default`, `border-hover`, `border-dashed` | Border colors |

**Usage in components:**
```tsx
<div className="bg-primary-500 text-text-primary border-border-default">
```

## Adding a New Page

1. Create folder: `src/pages/[page-name]/`
2. Create main component: `src/pages/[page-name]/PageName.tsx`
3. Add page-specific components in: `src/pages/[page-name]/components/`
4. Register route in `src/App.tsx`:
   ```tsx
   import { NewPage } from './pages/new-page/NewPage'
   
   const router = createBrowserRouter([
     {
       path: '/',
       element: <RootLayout />,
       children: [
         { index: true, element: <HomePage /> },
         { path: 'new-page', element: <NewPage /> },  // Add here
       ],
     },
   ])
   ```

## Commands

```bash
make install      # Install dependencies
make dev          # Start dev server
make build        # Production build
make lint         # Run ESLint + TypeScript check
make preview      # Preview production build
make upload       # Build + deploy to S3
make deploy-infra # Deploy AWS infrastructure
make clean        # Remove dist/ and node_modules/
```

## Infrastructure

AWS infrastructure (S3, CloudFront, Route53) is managed via CloudFormation.
See `infrastructure/README.md` for setup instructions.
