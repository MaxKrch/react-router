import RaceLayout from '@/layouts/RaceLayout'
import { ROUTES } from '@/shared/const/routes'
import lazyRoute from '@/shared/lib/lazy-router.ts/lazy-router'
import type { RouteObject } from 'react-router-dom'

const raceRoutes: RouteObject = {
  path: ROUTES.RACE_TAXI.BASE,
  element: <RaceLayout />,
  children: [
    {
      index: true,
      ...lazyRoute(() => import('@/pages/RaceTaxi/Home')),
    },
    {
      path: ROUTES.RACE_TAXI.FORZA,
      ...lazyRoute(() => import('@/pages/RaceTaxi/ForzaCarting')),
    },
    {
      path: ROUTES.RACE_TAXI.DRIFT,
      ...lazyRoute(() => import('@/pages/RaceTaxi/Drift'))
    },
    {
      path: ROUTES.RACE_TAXI.TIME_ATTACK,
      ...lazyRoute(() => import('@/pages/RaceTaxi/TimeAttack'))
    },
  ],
}

export default raceRoutes
