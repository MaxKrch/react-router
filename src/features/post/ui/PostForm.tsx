import usePostDetails from '@/features/post/model/use-post-details'
import PrimaryButton from '@/shared/ui/buttons/PrimaryButton'
import SecondButton from '@/shared/ui/buttons/SecondButton'
import { forwardRef, useState, type FormEvent } from 'react'

type PostFormProps = {
  onSubmit: () => void
  onCancel: () => void
  mode: 'create' | 'edit'
  title: string
  action: string
  submitDisabled?: boolean
  error?: string | null
}

const PostForm = forwardRef<HTMLFormElement, PostFormProps>((props, ref) => {
  const post = usePostDetails()
  const [formError, setFormError] = useState<string | null>(null)
  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const content = formData.get('content')

    if (typeof content !== 'string' || content.trim().length < 3) {
      setFormError('Пост должен быть длиннее двух символов')
      return
    } else {
      setFormError(null)
      props.onSubmit()
    }
  }

  return (
    <form
      data-testid="post-form"
      className="flex flex-col gap-2 p-2 rounded border border-white"
      ref={ref}
      action={props.action}
      onSubmit={handleSumbit}
      method="POST"
    >
      <h2 className="text-sm uppercase">{props.title}</h2>
      {props.mode === 'edit' && (
        <div>
          <label aria-label="Post id" htmlFor="postId"></label>
          <input hidden id="postId" name="id" value={post?.id ?? ''} readOnly />

          <label aria-label="Created id" htmlFor="created"></label>
          <input
            hidden
            id="created"
            name="created"
            value={post?.created ?? ''}
            readOnly
          />
        </div>
      )}
      <div>
        <label htmlFor="content" aria-label="form content"></label>
        <textarea
          defaultValue={post?.content}
          placeholder="Type your text"
          className="bg-white p-2 w-full h-full resize-none min-h-32 rounded outline-none"
          name="content"
          id="content"
        ></textarea>
      </div>
      <div className="h-6 px-2 text-red-500">{formError || props.error}</div>
      <div className="flex justify-end gap-2">
        <PrimaryButton
          title="Сохранить"
          type="submit"
          disabled={props.submitDisabled}
        />
        <SecondButton title="Отмена" onClick={props.onCancel} />
      </div>
    </form>
  )
})

PostForm.displayName = 'PostFrom'

export default PostForm
