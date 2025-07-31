import { BASE_URL } from '@/config'
import fetchRequest from '@/shared/api/fetch-request/fetch-request'
import { API_ROUTES } from '@/shared/const/api-routes'
import type { PostType } from '@/shared/types/posts'

const loadPosts = () => {
  const url = `${BASE_URL}${API_ROUTES.POSTS.url}`
  const options = {
    method: API_ROUTES.POSTS.method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return fetchRequest<PostType[]>({
    url,
    options,
  })
}

export default loadPosts
