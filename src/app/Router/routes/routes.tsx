import { type RouteObject } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import AppLayout from '@/layouts/AppLayout'
import networkRoutes from './network.routes'
import magazineRoutes from './magazine.routes'
import raceRoutes from './race.routes'
import lazyRoute from '@/shared/lib/lazy-router.ts/lazy-router'

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
        ...lazyRoute(() => import('@/pages/NotFoundPage'))
      },
    ],
  },
]

export default routes
