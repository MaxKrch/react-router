import NetworkLayout from '@/layouts/NetworkLayout'
import { ROUTES } from '@/shared/const/routes'
import lazyRouter from '@/shared/lib/lazy-router.ts/lazy-router'
import { Navigate } from 'react-router-dom'
import { createPostAction, deletePostAction, networkLoader, updatePostAction } from './network.actions'

const networkRoutes = {
  path: ROUTES.SOCIAL_NETWORK.BASE,
  element: <NetworkLayout />,
  children: [
    {
      index: true, 
      element: <Navigate to={ROUTES.SOCIAL_NETWORK.POST_FEED} replace={true} />
    },
    {
      path: ROUTES.SOCIAL_NETWORK.POST_FEED,
      loader: networkLoader,
      ...lazyRouter(() => import('@/pages/Network/PostFeed')),
      children: [
        {
          path: ROUTES.SOCIAL_NETWORK.CREATE_POST,
          action: createPostAction
        }
      ]
    },
    {
      path: ROUTES.SOCIAL_NETWORK.POST_DETAILS,
      ...lazyRouter(() => import('@/pages/Network/PostDetails')),
      children: [
        {
          path: ROUTES.SOCIAL_NETWORK.UPDATE_POST,
          action: updatePostAction
        },
        {
          path: ROUTES.SOCIAL_NETWORK.REMOVE_POST,
          action: deletePostAction
        }
      ]
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
