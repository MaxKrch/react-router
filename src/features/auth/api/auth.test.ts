import { BASE_URL } from '@/config'
import { API_ROUTES } from '@/shared/const/api-routes'
import { vi } from 'vitest'

const mockFetchRequest = vi.fn()
vi.mock('@/shared/api/fetch-request/fetch-request', () => ({
  default: mockFetchRequest,
}))

describe('API Helpers: auth', () => {
  let requestLogin: typeof import('./auth').requestLogin
  let requestProfile: typeof import('./auth').requestProfile

  describe('requestLogin', () => {
    const mockUser = {
      login: `Max`,
      password: `12345`,
    }
    const fullUrl = `${BASE_URL}${API_ROUTES.AUTH.url}`

    beforeEach(async () => {
      vi.clearAllMocks()
      ;({ requestLogin } = await import('./auth'))
    })

    it('should call fetchRequest with correct params without signal', () => {
      requestLogin(mockUser)

      expect(mockFetchRequest).toHaveBeenCalledWith({
        url: fullUrl,
        options: expect.objectContaining({
          method: API_ROUTES.AUTH.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockUser),
          signal: undefined,
        }),
      })
    })

    it('should pass provided AbortSignal to fetchRequest', () => {
      const controller = new AbortController()
      requestLogin({
        ...mockUser,
        signal: controller.signal,
      })

      expect(mockFetchRequest).toHaveBeenCalledWith({
        url: fullUrl,
        options: expect.objectContaining({
          method: API_ROUTES.AUTH.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockUser),
          signal: controller.signal,
        }),
      })
    })
  })

  describe('requestProfile', () => {
    const fullUrl = `${BASE_URL}${API_ROUTES.PROFILE.url}`

    beforeEach(async () => {
      vi.clearAllMocks()
      ;({ requestProfile } = await import('./auth'))
    })

    it('should call fetchRequest with correct params without signal', () => {
      requestProfile()

      expect(mockFetchRequest).toHaveBeenCalledWith({
        url: fullUrl,
        options: expect.objectContaining({
          method: API_ROUTES.PROFILE.method,
          headers: {
            'Content-Type': 'application/json',
          },
          signal: undefined,
        }),
        auth: true,
      })
    })

    it('should pass provided AbortSignal to fetchRequest', () => {
      const controller = new AbortController()
      requestProfile({
        signal: controller.signal,
      })

      expect(mockFetchRequest).toHaveBeenCalledWith({
        url: fullUrl,
        options: expect.objectContaining({
          method: API_ROUTES.PROFILE.method,
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        }),
        auth: true,
      })
    })
  })
})
