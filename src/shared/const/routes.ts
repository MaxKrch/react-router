export const ROUTES = {
  MAIN: '/',
  NEWS_MAGAZINE: {
    BASE: '/magazine',
    GUEST: '/magazine',
    NEWS_FEED: '/magazine/news/',
    NEWS_DEATILS: '/magazine/:id',
  },
  SOCIAL_NETWORK: {
    BASE: '/social',
    POST_FEED: '/social/posts',
    NEW_POST: '/social/posts/new',
    POST_DETAILS: '/social/posts/:id',
  },
  RACE_TAXI: {
    BASE: '/race',
    HOME: '/race',
    DRIFT: '/race/drift',
    TIME_ATTACK: '/race/timeattack',
    FORZA: '/race/forza',
  },
} as const
