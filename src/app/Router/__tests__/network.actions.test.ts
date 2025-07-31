import { STATUS } from '@/shared/const/status'
import { vi } from 'vitest'

const mockCreatePost = vi.fn()
vi.mock('@/features/post/api/create-post', () => ({
  default: mockCreatePost,
}))

const mockUpdatePost = vi.fn()
vi.mock('@/features/post/api/update-post', () => ({
  default: mockUpdatePost,
}))

const mockDeletePost = vi.fn()
vi.mock('@/features/post/api/delete-post', () => ({
  default: mockDeletePost,
}))

const mockLoadPosts = vi.fn()
vi.mock('@/features/post/api/load-posts', () => ({
  default: mockLoadPosts,
}))

describe('Network Actions', () => {
  let actions: typeof import('../routes/network.actions')

  beforeEach(async () => {
    vi.clearAllMocks()
    actions = await import('../routes/network.actions')
  })

  afterEach(() => {
    vi.resetModules()
  })

  describe('createPostAction', () => {
    it('should call createPost with correct data', async () => {
      const expected = 'New post text'
      mockCreatePost.mockResolvedValue({
        status: STATUS.SUCCESS,
      })

      const formData = new FormData()
      formData.append('content', expected)

      const request = new Request('http://localhost', {
        method: 'POST',
        body: formData,
      })

      const result = await actions.createPostAction({ request } as any)

      expect(mockCreatePost).toHaveBeenCalledWith({
        content: expected,
      })

      expect(result).toEqual({
        status: STATUS.SUCCESS,
      })
    })
  })

  describe('updatePostAction', () => {
    it('should call updatePost with correct data', async () => {
      const expected = {
        content: 'Updated post text',
        id: `123`,
        created: `${Date.now()}`,
      }

      mockUpdatePost.mockResolvedValue({
        status: STATUS.SUCCESS,
      })

      const formData = new FormData()
      formData.append('content', expected.content)
      formData.append('id', expected.id)
      formData.append('created', expected.created)

      const request = new Request('http://localhost', {
        method: 'POST',
        body: formData,
      })

      const result = await actions.updatePostAction({ request } as any)

      expect(mockUpdatePost).toHaveBeenCalledWith(expected)

      expect(result).toEqual({
        status: STATUS.SUCCESS,
      })
    })

    it('throw error, when empty id', async () => {
      const request = new Request('http://localhost', {
        method: 'POST',
        body: new FormData(),
      })

      await expect(
        actions.updatePostAction({ request } as any)
      ).rejects.toThrow('Post ID is missing')
    })
  })

  describe('deletePostAction', () => {
    it('removed post on id and redirected', async () => {
      const params = { id: '42' }

      const result = await actions.deletePostAction({ params } as any)

      expect(mockDeletePost).toHaveBeenCalledWith(42)
      expect(result).toEqual(
        expect.objectContaining({
          status: 302,
        })
      )
    })

    it('throw error, when empty id', async () => {
      await expect(
        actions.deletePostAction({ params: {} } as any)
      ).rejects.toThrow('Post ID is missing')
    })
  })

  describe('networkLoader', () => {
    it('return post list', async () => {
      mockLoadPosts.mockResolvedValue([{ id: 1, title: 'Test' }])

      const result = await actions.networkLoader({} as any)

      expect(mockLoadPosts).toHaveBeenCalled()
      expect(result).toEqual([{ id: 1, title: 'Test' }])
    })
  })
})
