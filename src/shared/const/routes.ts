export const ROUTES = {
  MAIN: '/',
  NEWS_MAGAZINE: {
    BASE: '/magazine',
    GUEST: '/magazine',
    NEWS_FEED: '/magazine/news/',
    NEWS_DEATILS: '/magazine/:id',
  },
  SOCIAL_NETWORK: {
    BASE: '/network',
    POST_FEED: '/network/posts',
    POST_DETAILS: '/network/posts/:id',
    NEW_POST: '/network/posts/new',
    EDIT_POST: '/network/posts/edit/:id',

    CREATE_POST: '/network/posts/create',
    UPDATE_POST: '/network/posts/:id/update',
    REMOVE_POST: '/network/posts/:id/remove',
  },
  RACE_TAXI: {
    BASE: '/race',
    HOME: '/race',
    DRIFT: '/race/drift',
    TIME_ATTACK: '/race/timeattack',
    FORZA: '/race/forza',
  },
} as const
