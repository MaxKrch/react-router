import { BASE_URL } from '@/config'
import fetchRequest from '@/shared/api/fetch-request/fetch-request'
import { API_ROUTES } from '@/shared/const/api-routes'
import type { PostType } from '@/shared/types/posts'

const deletePost = (id: PostType['id']) => {
  const targetApi = API_ROUTES.REMOVE_POST(id)
  const url = `${BASE_URL}${targetApi.url}`
  const options = {
    method: targetApi.method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return fetchRequest({
    url,
    options,
  })
}

export default deletePost
