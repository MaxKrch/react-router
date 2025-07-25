import type { News } from '../types/news'
import type { Post } from '../types/posts'

export const ROUTES = {
  MAIN: '/',
  NEWS_MAGAZINE: {
    BASE: '/magazine',
    GUEST: '/magazine',
    NEWS: '/magazine/news/',
    NEWS_DEATILS: (id: News[`id`]) => `/magazine/${id}`,
  },
  SOCIAL_NETWORK: {
    BASE: '/posts',
    POSTS: '/posts',
    NEW_POST: '/posts/new',
    POST_DETAILS: (id: Post[`id`]) => `/posts/${id}`,
  },
  RACE_TAXI: {
    BASE: '/race',
    HOME: '/race',
    DRIFT: '/race/drift',
    TIME_ATTACK: '/race/timeattack',
    FORZA: '/race/forza',
  },
} as const
