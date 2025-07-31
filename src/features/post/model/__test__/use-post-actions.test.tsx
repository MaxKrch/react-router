import { renderHook, act } from '@testing-library/react'
import usePostActions from '../use-post-actions'
import PostContext from '../PostContext' // твой провайдер

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PostContext>{children}</PostContext>
)

describe('usePostActions', () => {
  const posts = [
    {
      id: 0,
      content: 'Post',
      saved: true,
      created: Date.now(),
      edited: null,
    },
    {
      id: 1,
      content: 'Post 1',
      saved: true,
      created: Date.now(),
      edited: null,
    },
    {
      id: 2,
      content: 'Post 2',
      saved: true,
      created: Date.now(),
      edited: null,
    },
  ]

  it('sets post ato state', () => {
    const { result } = renderHook(() => usePostActions(), { wrapper })

    act(() => {
      result.current.setPost(posts)
    })

    expect(result.current.state).toEqual(posts)
  })

  it('adds a post and updates state', () => {
    const { result } = renderHook(() => usePostActions(), { wrapper })

    act(() => {
      result.current.addPost(posts[0])
    })

    expect(result.current.state).toContainEqual(posts[0])
  })

  it('removes a post by id', () => {
    const { result } = renderHook(() => usePostActions(), { wrapper })

    act(() => {
      result.current.setPost(posts)
    })

    act(() => {
      result.current.removePost(posts[0].id)
    })

    expect(
      result.current.state.find((p) => p.id === posts[0].id)
    ).toBeUndefined()
  })

  it('updates a post', () => {
    const expected = 'New post text'
    const { result } = renderHook(() => usePostActions(), { wrapper })

    act(() => {
      result.current.setPost(posts)
    })

    act(() => {
      result.current.updatePost({
        ...posts[0],
        content: expected,
      })
    })

    expect(
      result.current.state.find((p) => p.id === posts[0].id)?.content
    ).toBe(expected)
  })
})
