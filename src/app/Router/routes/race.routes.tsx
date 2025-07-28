import RaceLayout from '@/layouts/RaceLayout'
import { ROUTES } from '@/shared/const/routes'
import Spinner from '@/shared/ui/Spinner'
import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'

const raceRoutes: RouteObject = {
  path: ROUTES.RACE_TAXI.BASE,
  element: <RaceLayout />,
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: HomePage } = await import('@/pages/RaceTaxi/Home')
        return {
          element: <Suspense fallback={<Spinner />}><HomePage /></Suspense>,
        }
      },
    },
    {
      path: ROUTES.RACE_TAXI.FORZA,
      lazy: async () => {
        const { default: ForzaCarting } = await import(
          '@/pages/RaceTaxi/ForzaCarting'
        )
        return {
          element: <Suspense fallback={<Spinner />}><ForzaCarting /></Suspense>,
        }
      },
    },
    {
      path: ROUTES.RACE_TAXI.DRIFT,
      lazy: async () => {
        const { default: Drift } = await import('@/pages/RaceTaxi/Drift')
        return {
          element: <Suspense fallback={<Spinner />}><Drift /></Suspense>,
        }
      },
    },
    {
      path: ROUTES.RACE_TAXI.TIME_ATTACK,
      lazy: async () => {
        const { default: TimeAttack } = await import(
          '@/pages/RaceTaxi/TimeAttack'
        )
        return {
          element: <Suspense fallback={<Spinner />}><TimeAttack /></Suspense>,
        }
      },
    },
  ],
}

export default raceRoutes
