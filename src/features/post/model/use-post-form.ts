import type { PostType } from '@/shared/types/posts'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { useFetcher, useNavigate } from 'react-router-dom'
import usePostActions from '@/features/post/model/use-post-actions'
import { STATUS } from '@/shared/const/status'
import { ROUTES } from '@/shared/const/routes'
import generatePathWithId from '@/shared/lib/router/generate-path-with-id'

export type UsePostFormProps = {
  mode: 'create' | 'edit'
  initialData?: PostType | null
  onSuccess?: () => void
}

export type UsePostFormReturn = {
  formRef: RefObject<HTMLFormElement>
  handleSubmit: () => void
  handleCancel: () => void
  error: string | null
  submitting: boolean
}

const usePostForm = ({ mode, initialData, onSuccess }: UsePostFormProps) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const currentSendingId = useRef<number | null>(null)
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const { addPost, removePost, updatePost } = usePostActions()

  useEffect(() => {
    console.log(fetcher.data)
    if (fetcher.state === 'idle' && fetcher.data) {
      const id = currentSendingId.current
      currentSendingId.current = null

      setSubmitting(false)

      if (fetcher.data.status === STATUS.SUCCESS) {
        if (onSuccess) onSuccess()
      } else {
        setError('Ошибка отправки')
        removePost(id)
      }
    }
  }, [fetcher.state, fetcher.data, onSuccess, removePost])

  const handleSubmit = useCallback(async () => {
    if (!formRef.current || submitting) return

    setSubmitting(true)
    setError(null)

    currentSendingId.current = initialData ? initialData.id : Date.now()

    const formData = new FormData(formRef.current)
    const content = formData.get('content')?.toString().trim() ?? ''
    const tempPost: PostType = initialData
      ? {
          ...initialData,
          content,
        }
      : {
          id: currentSendingId.current,
          saved: false,
          content,
          created: null,
          edited: null,
        }

    mode === 'create' ? addPost(tempPost) : updatePost(tempPost)

    const action =
      mode === 'create'
        ? ROUTES.SOCIAL_NETWORK.CREATE_POST
        : generatePathWithId(
            ROUTES.SOCIAL_NETWORK.UPDATE_POST,
            Number(tempPost.id)
          )

    await fetcher.submit(formData, {
      method: 'post',
      action,
    })
  }, [formRef, initialData, addPost, updatePost, fetcher, mode, submitting])

  const handleCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return {
    formRef,
    handleSubmit,
    handleCancel,
    error,
    submitting,
  }
}

export default usePostForm
