import { useCallback } from 'react'
import PostForm from './PostForm'
import { ROUTES } from '@/shared/const/routes'
import { useNavigate } from 'react-router-dom'
import usePostForm from '../model/use-post-form'

const CreatePostForm = () => {
  const navigate = useNavigate()
  const onSuccess = useCallback(() => {
    navigate(ROUTES.SOCIAL_NETWORK.POST_FEED)
  }, [navigate])

  const { formRef, handleSubmit, handleCancel, error, submitting } =
    usePostForm({
      mode: 'create',
      onSuccess: onSuccess,
    })

  return (
    <PostForm
      ref={formRef}
      mode="create"
      title="Новый пост"
      action={ROUTES.SOCIAL_NETWORK.CREATE_POST}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitDisabled={submitting}
      error={error}
    />
  )
}

export default CreatePostForm
