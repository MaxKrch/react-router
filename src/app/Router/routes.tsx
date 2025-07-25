import { type RouteObject } from 'react-router-dom'
import { ROUTES } from '@/shared/const/routes'
import MainPage from '@/pages/MainPage'
import RaceLayout from '@/layouts/RaceLayout'
import AppLayout from '@/layouts/AppLayout'
import NetworkLayout from '@/layouts/NetworkLayout'
import MagazineLayout from '@/layouts/MagazineLayout'
import ErrorBoundary from '@/app/ErrorBoundary'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: ROUTES.RACE_TAXI.BASE,
                element: <RaceLayout />,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { default: HomePage } = await import('@/pages/RaceTaxi/Home');
                            return { 
                                element: <HomePage />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.RACE_TAXI.FORZA,
                        lazy: async () => {
                            const { default: ForzaCarting } = await import('@/pages/RaceTaxi/ForzaCarting');
                            return {
                                element: <ForzaCarting />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.RACE_TAXI.DRIFT,
                        lazy: async () => {
                            const { default: Drift } = await import('@/pages/RaceTaxi/Drift');
                            return {
                                element: <Drift />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.RACE_TAXI.TIME_ATTACK,
                        lazy: async () => {
                            const { default: TimeAttack } = await import('@/pages/RaceTaxi/TimeAttack');
                            return {
                                element: <TimeAttack />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    }
                ]
            },
            {
                path: ROUTES.NEWS_MAGAZINE.BASE,
                element: <MagazineLayout />,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { default: GuestPages } = await import('@/pages/Magazine/GuestPage');
                            return {
                                element: <GuestPages />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.NEWS_MAGAZINE.NEWS_FEED,
                        lazy: async () => {
                            const { default: NewsFeed } = await import('@/pages/Magazine/NewsFeed');
                            return {
                                element: <NewsFeed />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.NEWS_MAGAZINE.NEWS_DEATILS,
                        lazy: async () => {
                            const { default: NewsDetails } = await import('@/pages/Magazine/NewsDetails');
                            return {
                                element: <NewsDetails />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: '*',
                        lazy: async () => {
                            const { default: NotFoundNews } = await import('@/pages/Magazine/NotFoundNews');
                            return {
                                element: <NotFoundNews />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    }
                ]
            },
            {
                path: ROUTES.SOCIAL_NETWORK.BASE,
                element: <NetworkLayout />,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { default: Feed } = await import('@/pages/Network/Feed');
                            return {
                                element: <Feed />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.SOCIAL_NETWORK.POST_DETAILS,
                        lazy: async () => {
                            const { default: Post } = await import('@/pages/Network/Post');
                            return {
                                element: <Post />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    },
                    {
                        path: ROUTES.SOCIAL_NETWORK.NEW_POST,
                        lazy: async () => {
                            const { default: CreatePost } = await import('@/pages/Network/CreatePost');
                            return {
                                element: <CreatePost />,
                                ErrorBoundary: ErrorBoundary
                            }
                        }
                    }
                ]
            },
            {
                path: '*',
                lazy: async () => {
                    const { default: NotFoundPage } = await import('@/pages/NotFoundPage');
                    return {
                        element: <NotFoundPage />,
                        ErrorBoundary: ErrorBoundary
                    }
                }
            }
        ]
    }
]

export default routes;