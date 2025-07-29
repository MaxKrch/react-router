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
    POST_DETAILS: '/social/posts/:id',
    NEW_POST: '/social/posts/new',
    EDIT_POST: '/social/delete/:id',
    UPDATE_POST: '/social/update/:id',
  },
  RACE_TAXI: {
    BASE: '/race',
    HOME: '/race',
    DRIFT: '/race/drift',
    TIME_ATTACK: '/race/timeattack',
    FORZA: '/race/forza',
  },
} as const
