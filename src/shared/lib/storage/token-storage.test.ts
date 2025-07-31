import { tokenStorage } from './token-storage'

describe('Helper: tokenStorage', () => {
  const token = '12ggfh-jkls-kkjk-54jhj25s'
  const tokenKey = 'token'

  beforeEach(() => {
    localStorage.clear()
  })

  describe('setToken', () => {
    it('should store the token in localStorage', () => {
      tokenStorage.setToket(token)

      const received = localStorage.getItem(tokenKey)

      expect(received).toBe(token)
    })
  })

  describe('getToken', () => {
    it('should return the token from localStorage', () => {
      localStorage.setItem(tokenKey, token)

      const received = tokenStorage.getToken()

      expect(received).toBe(token)
    })

    it('should return null if token is not in localStorage', () => {
      const received = tokenStorage.getToken()

      expect(received).toBe(null)
    })
  })

  describe('removeToken', () => {
    it('should remove the token from localStorage', () => {
      tokenStorage.setToket(token)

      const firstReceived = localStorage.getItem(tokenKey)
      expect(firstReceived).toBe(token)

      tokenStorage.removeToken()
      const secondReceived = localStorage.getItem(tokenKey)

      expect(secondReceived).toBe(null)
    })
  })
})
