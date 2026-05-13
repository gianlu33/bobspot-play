import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { HomePage } from './pages/home/HomePage'
import { SocialEnginePage } from './pages/socialengine/SocialEnginePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'socialengine',
        element: <SocialEnginePage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
