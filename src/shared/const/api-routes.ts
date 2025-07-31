import type { NewsType } from '../types/news'
import type { PostType } from '../types/posts'

export const API_ROUTES = {
  AUTH: {
    method: 'POST',
    url: '/auth',
  },
  PROFILE: {
    method: 'GET',
    url: '/private/me',
  },
  NEWS: {
    method: 'GET',
    url: '/private/news',
  },
  NEWS_DETAILS: (id: NewsType['id']) => ({
    method: 'GET',
    url: `/private/news/${id}`,
  }),
  POSTS: {
    method: 'GET',
    url: '/posts',
  },
  POST_DETAILS: (id: PostType['id']) => ({
    method: 'GET',
    url: `/posts/${id}`,
  }),
  CREATE_POST: {
    method: 'POST',
    url: '/posts',
  },
  UPDATE_POST: (id: PostType['id']) => ({
    method: 'PUT',
    url: `/posts/${id}`,
  }),
  REMOVE_POST: (id: PostType['id']) => ({
    method: 'DELETE',
    url: `/posts/${id}`,
  }),
} as const
