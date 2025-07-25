import type { News } from '../types/news'
import type { Post } from '../types/posts'

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
  NEWS_DETAILS: (id: News['id']) => ({
    method: 'GET',
    url: `/private/news/${id}`,
  }),
  POSTS: {
    method: 'GET',
    url: '/posts',
  },
  POST_DETAILS: (id: Post['id']) => ({
    method: 'GET',
    url: `/posts/${id}`,
  }),
  CREATE_POST: {
    method: 'POST',
    url: '/posts',
  },
  UPDATE_POST: (id: Post['id']) => ({
    method: 'PUT',
    url: `/posts/${id}`,
  }),
  REMOVE_POST: (id: Post['id']) => ({
    method: 'DELETE',
    url: `/posts/${id}`,
  }),
} as const
