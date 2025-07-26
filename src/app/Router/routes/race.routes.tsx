import RaceLayout from '@/layouts/RaceLayout'
import { ROUTES } from '@/shared/const/routes'
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
          element: <HomePage />,
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
          element: <ForzaCarting />,
        }
      },
    },
    {
      path: ROUTES.RACE_TAXI.DRIFT,
      lazy: async () => {
        const { default: Drift } = await import('@/pages/RaceTaxi/Drift')
        return {
          element: <Drift />,
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
          element: <TimeAttack />,
        }
      },
    },
  ],
}

export default raceRoutes
