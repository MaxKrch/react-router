import { STATUS } from '@/shared/const/status'
import { act, renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import usePostForm from '../use-post-form'
import PostContext from '../PostContext'
import type { PropsWithChildren } from 'react'
import type { PostType } from '@/shared/types/posts'

const mockSubmit = vi.fn()
const mockAddPost = vi.fn()
const mockRemovePost = vi.fn()
const mockUpdatePost = vi.fn()
const fetcherStates = [
  { state: 'idle', data: undefined, submit: mockSubmit },
  { state: 'idle', data: { status: STATUS.SUCCESS }, submit: mockSubmit },
  { state: 'idle', data: { status: STATUS.ERROR }, submit: mockSubmit },
]
let currentFetcherState = fetcherStates[0]

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useFetcher: () => ({
      ...currentFetcherState,
    }),
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/features/post/model/use-post-actions', () => ({
  default: () => ({
    addPost: mockAddPost,
    removePost: mockRemovePost,
    updatePost: mockUpdatePost,
  }),
}))

describe('usePostForm', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <PostContext>{children}</PostContext>
  )
  const mockPost: PostType = {
    id: 0,
    content: 'Test post',
    saved: false,
    created: Date.now(),
    edited: null,
  }

  const form = document.createElement('form')
  const input = document.createElement('input')
  input.name = 'content'
  input.value = mockPost.content
  form.appendChild(input)

  beforeEach(() => {
    vi.clearAllMocks()
    currentFetcherState = fetcherStates[0]
  })

  it('submits new post and calls addPost', async () => {
    const { result } = renderHook(
      () =>
        usePostForm({
          mode: 'create',
        }),
      { wrapper }
    )

    act(() => {
      result.current.formRef.current = form
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(mockAddPost).toHaveBeenCalledWith(
      expect.objectContaining({
        content: mockPost.content,
      })
    )

    expect(mockSubmit).toHaveBeenCalled()
  })

  it('submits updated post and calls updatePost', async () => {
    input.value = 'updated content'

    const { result } = renderHook(
      () =>
        usePostForm({
          mode: 'edit',
          initialData: mockPost,
        }),
      { wrapper }
    )

    act(() => {
      result.current.formRef.current = form
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(mockUpdatePost).toHaveBeenCalledWith({
      ...mockPost,
      content: 'updated content',
    })
    expect(mockSubmit).toHaveBeenCalled()
  })

  it('calls onSuccess on successful submit (fetcher.dara.STATUS is success ans passed onSucces)', async () => {
    const onSuccess = vi.fn()

    const { result, rerender } = renderHook(
      () =>
        usePostForm({
          mode: 'create',
          initialData: null,
          onSuccess,
        }),
      { wrapper }
    )

    act(() => {
      result.current.formRef.current = form
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    currentFetcherState = fetcherStates[1]
    rerender()

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })

  it('handles fetcher error and calls removePost', () => {
    const { result, rerender } = renderHook(
      () =>
        usePostForm({
          mode: 'create',
          initialData: mockPost,
        }),
      { wrapper }
    )

    act(() => {
      result.current.handleSubmit()
    })

    currentFetcherState = fetcherStates[2]
    rerender()

    expect(mockRemovePost).toHaveBeenCalled()
  })

  it('does not submit if already submitting', async () => {
    const { result } = renderHook(
      () =>
        usePostForm({
          mode: 'create',
          initialData: null,
        }),
      { wrapper }
    )

    act(() => {
      ;(result.current as any).submitting = true
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('does not submit if formRef is null', async () => {
    const { result } = renderHook(
      () =>
        usePostForm({
          mode: 'create',
          initialData: null,
        }),
      { wrapper }
    )

    result.current.formRef.current = null

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('handleCancel navigates back', () => {
    const { result } = renderHook(
      () =>
        usePostForm({
          mode: 'create',
          initialData: null,
        }),
      { wrapper }
    )

    act(() => {
      result.current.handleCancel()
    })

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
