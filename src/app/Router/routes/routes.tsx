import { type RouteObject } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import AppLayout from '@/layouts/AppLayout'
import networkRoutes from './network.routes'
import magazineRoutes from './magazine.routes'
import raceRoutes from './race.routes'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      raceRoutes,
      magazineRoutes,
      networkRoutes,
      {
        path: '*',
        lazy: async () => {
          const { default: NotFoundPage } = await import('@/pages/NotFoundPage')
          return {
            element: <NotFoundPage />,
          }
        },
      },
    ],
  },
]

export default routes
