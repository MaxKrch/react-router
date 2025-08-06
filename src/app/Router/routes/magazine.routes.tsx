import MagazineLayout from '@/layouts/MagazineLayout'
import { ROUTE_ACCESS, ROUTES } from '@/shared/const/routes'
import lazyRouter from '@/shared/lib/lazy-router.ts/lazy-router'

const magazineRoutes = {
  path: ROUTES.NEWS_MAGAZINE.BASE,
  element: <MagazineLayout />,
  children: [
    {
      index: true,
      ...lazyRouter(
        () => import('@/pages/Magazine/GuestPage'),
        ROUTE_ACCESS.NO_AUTH
      )
    },
    {
      path: ROUTES.NEWS_MAGAZINE.NEWS_FEED,
      ...lazyRouter(
        () => import('@/pages/Magazine/NewsFeed'), 
        ROUTE_ACCESS.AUTH
      )
    },
    {
      path: ROUTES.NEWS_MAGAZINE.NEWS_DEATILS,
      ...lazyRouter(
        () => import('@/pages/Magazine/NewsDetails'), 
        ROUTE_ACCESS.AUTH,
      )
    },
  ],
}

export default magazineRoutes
