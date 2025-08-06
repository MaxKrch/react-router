import { AUTH_STATUS, STATUS, type AUTH_STATUS_TYPE } from '@/consts'
import type { UserProfile } from '@/types'
import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { vi } from 'vitest'

const mockAuthApi = {
  requestLogin: vi.fn(),
  requestProfile: vi.fn(),
}

vi.mock('@/api/auth', () => mockAuthApi)

const mockUserContext = {
  setUserData: vi.fn(),
  setUserStatus: vi.fn(),
  removeUserData: vi.fn(),
}
let mockAuthStatus: AUTH_STATUS_TYPE = AUTH_STATUS.IDLE
vi.mock('@/context', () => ({
  useUserDispatch: () => mockUserContext,
  useUserState: () => ({
    status: mockAuthStatus,
  }),
}))

const mockStorage = {
  getToken: vi.fn(),
  setToket: vi.fn(),
  removeToken: vi.fn(),
  getProfile: vi.fn(),
  setProfile: vi.fn(),
  removeProfile: vi.fn(),
}

vi.mock('@/helpers/storage', () => ({
  storage: mockStorage,
}))

describe('Hook: useAuth', () => {
  let useAuth: typeof import('./use-auth').default
  const pendingPromise = new Promise(() => {})
  const mockUser: UserProfile = {
    id: '1',
    login: 'max',
    avatar: 'avatar',
    name: 'Max',
  }
  const mockUserData = {
    login: 'max',
    password: 'secret',
  }
  const mockToken = 'token-string'

  beforeEach(async () => {
    useAuth = (await import('./use-auth')).default
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  describe('general', () => {
    it('set status IDLE on loginStatus and getProfeileStatus', () => {
      const { result } = renderHook(() => useAuth())

      expect(result.current.loginStatus).toBe(STATUS.IDLE)
      expect(result.current.getProfileStatus).toBe(STATUS.IDLE)
    })

    it('should set getProfileStatus to IDLE when authStatus changes to UNAUTH', async () => {
      mockAuthStatus = AUTH_STATUS.AUTH

      const { result, rerender } = renderHook(() => useAuth())

      await act(() => {
        result.current.getProfileStatus = STATUS.SUCCESS
      })

      mockAuthStatus = AUTH_STATUS.UNAUTH

      rerender()

      expect(result.current.getProfileStatus).toBe(STATUS.IDLE)
    })
  })

  describe('login function', () => {
    it('sets loginStatus to PENDING and userStatus to PENDING when login starts', async () => {
      mockAuthApi.requestLogin.mockImplementationOnce(() => pendingPromise)

      const { result } = renderHook(() => useAuth())

      await act(() => {
        result.current.login(mockUserData)
      })

      expect(result.current.loginStatus).toBe(STATUS.PENDING)
    })

    it('on successful login sets token, loginStatus to SUCCESS, userStatus to AUTH', async () => {
      mockAuthApi.requestLogin.mockResolvedValueOnce({
        status: STATUS.SUCCESS,
        data: { token: mockToken },
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login(mockUserData)
      })

      expect(mockStorage.setToket).toHaveBeenCalledWith(mockToken)
      expect(result.current.loginStatus).toBe(STATUS.SUCCESS)
      expect(mockUserContext.setUserStatus).toHaveBeenCalledWith(
        AUTH_STATUS.AUTH
      )
    })

    it('on failed login removes token, sets loginStatus to ERROR, userStatus to UNAUTH', async () => {
      mockAuthApi.requestLogin.mockResolvedValueOnce({
        status: STATUS.ERROR,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login(mockUserData)
      })

      expect(mockStorage.removeToken).toHaveBeenCalled()
      expect(result.current.loginStatus).toBe(STATUS.ERROR)
      expect(mockUserContext.setUserStatus).toHaveBeenCalledWith(
        AUTH_STATUS.UNAUTH
      )
    })
  })

  describe('logout function', () => {
    it('removes token and profile from storage and sets userStatus to UNAUTH and removes user data', () => {
      const { result } = renderHook(() => useAuth())

      act(() => {
        result.current.logout()
      })

      expect(mockStorage.removeToken).toHaveBeenCalled()
      expect(mockStorage.removeProfile).toHaveBeenCalled()
      expect(mockUserContext.setUserStatus).toHaveBeenCalledWith(
        AUTH_STATUS.UNAUTH
      )
      expect(mockUserContext.removeUserData).toHaveBeenCalled()
    })
  })

  describe('autoLogin function', () => {
    it('if token exists in storage, sets userStatus to AUTH', async () => {
      mockStorage.getToken.mockReturnValue(mockToken)

      const { result } = renderHook(() => useAuth())

      await act(() => {
        result.current.autoLogin()
      })

      expect(mockUserContext.setUserStatus).toHaveBeenCalledWith(
        AUTH_STATUS.AUTH
      )
    })

    it('if no token, does nothing or leaves userStatus unchanged', async () => {
      mockStorage.getToken.mockReturnValue(null)

      const { result } = renderHook(() => useAuth())

      await act(() => {
        result.current.autoLogin()
      })

      expect(mockUserContext.setUserStatus).not.toHaveBeenCalled()
    })
  })

  describe('getProfile function', () => {
    it('sets getProfileStatus to PENDING when fetching profile', async () => {
      mockAuthApi.requestProfile.mockImplementationOnce(() => pendingPromise)

      const { result } = renderHook(() => useAuth())

      await act(() => {
        result.current.getProfile()
      })

      expect(result.current.getProfileStatus).toBe(STATUS.PENDING)
    })
    it('on successful fetch sets profile in storage, userData and getProfileStatus to SUCCESS', async () => {
      mockAuthApi.requestProfile.mockResolvedValue({
        status: STATUS.SUCCESS,
        data: mockUser,
      })

      const { result } = renderHook(() => useAuth())

      await act(() => {
        result.current.getProfile()
      })

      expect(result.current.getProfileStatus).toBe(STATUS.SUCCESS)
      expect(mockStorage.setProfile).toHaveBeenCalledWith(mockUser)
      expect(mockUserContext.setUserData).toHaveBeenCalledWith(mockUser)
    })
    it('on failed fetch removes token, sets userStatus to UNAUTH and getProfileStatus to ERROR', async () => {
      mockAuthApi.requestProfile.mockResolvedValueOnce({
        status: STATUS.ERROR,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.getProfile()
      })

      expect(mockStorage.removeToken).toHaveBeenCalled()
      expect(result.current.getProfileStatus).toBe(STATUS.ERROR)
      expect(mockUserContext.setUserStatus).toHaveBeenCalledWith(
        AUTH_STATUS.UNAUTH
      )
    })
  })
})
