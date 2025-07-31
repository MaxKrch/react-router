import usePostActions from '@/features/post/model/use-post-actions'
import { ROUTES } from '@/shared/const/routes'
import generatePathWithId from '@/shared/lib/router/generate-path-with-id'
import type { PostType } from '@/shared/types/posts'
import { useCallback } from 'react'
import { useFetcher, useNavigate } from 'react-router-dom'

const useHandlePost = (post: PostType) => {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const { removePost } = usePostActions()

  const handleEditPost = useCallback(() => {
    if (!post.id) return
    navigate(generatePathWithId(ROUTES.SOCIAL_NETWORK.EDIT_POST, post.id))
  }, [navigate, post.id])

  const handleRemovePost = useCallback(() => {
    if (!post.id) return
    removePost(post.id)
    fetcher.submit(null, {
      method: 'post',
      action: generatePathWithId(ROUTES.SOCIAL_NETWORK.REMOVE_POST, post.id),
    })
  }, [fetcher, post.id, removePost])

  return {
    handleEditPost,
    handleRemovePost,
  }
}

export default useHandlePost
