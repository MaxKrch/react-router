import usePostActions from '@/features/post/model/use-post-actions'
import type { PostType } from '@/shared/types/posts'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const usePostDetails = () => {
  const [post, setPost] = useState<PostType | null>(null)
  const location = useParams()
  const id = Number(location.id)
  const { state } = usePostActions()

  useEffect(() => {
    const post = state.find((post) => post.id === id) ?? null
    setPost(post)
  }, [id, state])

  return post
}

export default usePostDetails
