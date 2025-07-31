import { renderHook } from '@testing-library/react'
import { vi, afterAll } from 'vitest'

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '3' })),
  }
})

const posts = [
  {
    id: 0,
    content: 'Test Post',
    saved: true,
    created: Date.now(),
    edited: null,
  },
  {
    id: 1,
    content: 'Test Post 1',
    saved: true,
    created: Date.now(),
    edited: null,
  },
  {
    id: 2,
    content: 'Test Post 2',
    saved: true,
    created: Date.now(),
    edited: null,
  },
  {
    id: 3,
    content: 'Test Post 3',
    saved: true,
    created: Date.now(),
    edited: null,
  },
]

vi.mock('@/features/post/model/use-post-actions', () => ({
  default: () => ({
    state: posts,
  }),
}))

import usePostDetails from '@/features/post/model/use-post-details'
import { useParams } from 'react-router-dom'

describe('usePostDetails', () => {
  afterAll(() => {
    vi.resetAllMocks()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns the correct post by id from state', () => {
    const { result } = renderHook(() => usePostDetails())

    expect(result.current).toEqual(posts[3])
  })

  it('returns null if no matching post is found', () => {
    vi.mocked(useParams).mockReturnValue({ id: '999' })

    const { result } = renderHook(() => usePostDetails())
    expect(result.current).toBeNull()
  })

  it('updates when id in params changes', () => {
    vi.mocked(useParams).mockReturnValue({ id: '3' })
    const { result, rerender } = renderHook(() => usePostDetails())

    expect(result.current).toEqual(posts[3])

    vi.mocked(useParams).mockReturnValue({ id: '2' })
    rerender()

    expect(result.current).toEqual(posts[2])
  })
})
