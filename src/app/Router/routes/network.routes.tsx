import { ROUTES } from '@/shared/const/routes'
import NetworkLayout from '@/layouts/NetworkLayout'

const networkRoutes = {
  path: ROUTES.SOCIAL_NETWORK.BASE,
  element: <NetworkLayout />,
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: PostFeed } = await import('@/pages/Network/PostFeed')
        return {
          element: <PostFeed />,
        }
      },
    },
    {
      path: ROUTES.SOCIAL_NETWORK.POST_DETAILS,
      lazy: async () => {
        const { default: PostDetails } = await import(
          '@/pages/Network/PostDetails'
        )
        return {
          element: <PostDetails />,
        }
      },
    },
    {
      path: ROUTES.SOCIAL_NETWORK.NEW_POST,
      lazy: async () => {
        const { default: CreatePost } = await import(
          '@/pages/Network/CreatePost'
        )
        return {
          element: <CreatePost />,
        }
      },
    },
  ],
}
export default networkRoutes
