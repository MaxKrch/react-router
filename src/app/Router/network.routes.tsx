import { ROUTES } from '@/shared/const/routes';
import NetworkLayout from '@/layouts/NetworkLayout';

const networkRoutes = {
    path: ROUTES.SOCIAL_NETWORK.BASE,
    element: <NetworkLayout />,
    children: [
        {
            index: true,
            lazy: async () => {
                const { default: Feed } = await import('@/pages/Network/Feed');
                return {
                    element: <Feed />,                                 
                }
            }
        },
        {
            path: ROUTES.SOCIAL_NETWORK.POST_DETAILS,
            lazy: async () => {
                const { default: Post } = await import('@/pages/Network/Post');
                return {
                    element: <Post />,                                 
                }
            }
        },
        {
            path: ROUTES.SOCIAL_NETWORK.NEW_POST,
            lazy: async () => {
                const { default: CreatePost } = await import('@/pages/Network/CreatePost');
                return {
                    element: <CreatePost />,                                 
                }
            }
        }
    ]
}
export default networkRoutes