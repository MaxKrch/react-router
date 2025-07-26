import MagazineLayout from '@/layouts/MagazineLayout'
import { ROUTES } from '@/shared/const/routes'

const magazineRoutes = {
  path: ROUTES.NEWS_MAGAZINE.BASE,
  element: <MagazineLayout />,
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: GuestPages } = await import(
          '@/pages/Magazine/GuestPage'
        )
        return {
          element: <GuestPages />,
        }
      },
    },
    {
      path: ROUTES.NEWS_MAGAZINE.NEWS_FEED,
      lazy: async () => {
        const { default: NewsFeed } = await import('@/pages/Magazine/NewsFeed')
        return {
          element: <NewsFeed />,
        }
      },
    },
    {
      path: ROUTES.NEWS_MAGAZINE.NEWS_DEATILS,
      lazy: async () => {
        const { default: NewsDetails } = await import(
          '@/pages/Magazine/NewsDetails'
        )
        return {
          element: <NewsDetails />,
        }
      },
    },
    {
      path: '*',
      lazy: async () => {
        const { default: NotFoundNews } = await import(
          '@/pages/Magazine/NotFoundNews'
        )
        return {
          element: <NotFoundNews />,
        }
      },
    },
  ],
}

export default magazineRoutes
