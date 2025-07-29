import { ROUTES } from '@/shared/const/routes'
import NetworkLayout from '@/layouts/NetworkLayout'
import lazyRouter from '@/shared/lib/lazy-router.ts/lazy-router'

const networkRoutes = {
  path: ROUTES.SOCIAL_NETWORK.BASE,
  element: <NetworkLayout />,
  children: [
    {
      index: true,
      ...lazyRouter(() => import('@/pages/Network/PostFeed'))
    },
    {
      path: ROUTES.SOCIAL_NETWORK.POST_DETAILS,
      ...lazyRouter(() => import('@/pages/Network/PostDetails'))
    },
    {
      path: ROUTES.SOCIAL_NETWORK.NEW_POST,
      ...lazyRouter(() => import('@/pages/Network/CreatePost'))
    },
    {
      path: ROUTES.SOCIAL_NETWORK.EDIT_POST,
      ...lazyRouter(() => import('@/pages/Network/EditPost')),
    }
  ],
}
export default networkRoutes
