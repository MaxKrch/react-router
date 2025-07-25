export const ROUTES = {
  MAIN: '/',
  NEWS_MAGAZINE: {
    BASE: '/magazine',
    GUEST: '/magazine',
    NEWS: '/magazine/news/',
    NEWS_DEATILS: '/magazine/:id',
  },
  SOCIAL_NETWORK: {
    BASE: '/posts',
    POSTS: '/posts',
    NEW_POST: '/posts/new',
    POST_DETAILS: '/posts/:id',
  },
  RACE_TAXI: {
    BASE: '/race',
    HOME: '/race',
    DRIFT: '/race/drift',
    TIME_ATTACK: '/race/timeattack',
    FORZA: '/race/forza',
  },
} as const
