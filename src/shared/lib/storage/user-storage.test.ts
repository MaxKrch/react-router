import type { UserProfile } from '@/shared/types'
import { userStorage } from './user-storage';

describe('Helper: userStorage', () => {
  const profile: UserProfile = {
    id: 'string_id',
    login: `max_login`,
    name: 'Max',
    avatar: `http://www.avatar.com/1`,
  }
  const profileKey = 'profile';

  beforeEach(() => {
    localStorage.clear()
  })

  describe('setProfile', () => {
    it('should stringify and store the profile in localStorage', () => {
      userStorage.setProfile(profile)

      const received = JSON.parse(localStorage.getItem(profileKey) ?? `{}`)

      expect(received).toEqual(profile)
    })
  })

  describe('getProfile', () => {
    it('should return the parsed user profile from localStorage', () => {
      localStorage.setItem(profileKey, JSON.stringify(profile))

      const received = userStorage.getProfile()

      expect(received).toEqual(profile)
    })

    it('should return null if profile is not in localStorage', () => {
      const received = userStorage.getProfile()

      expect(received).toBe(null)
    })

    it('should return null if stored profile is invalid JSON', () => {
      localStorage.setItem(profileKey, `string`)

      const received = userStorage.getProfile()

      expect(received).toBe(null)
    })
  })

  describe('removeProfile', () => {
    it('should remove the profile from localStorage', () => {
      userStorage.setProfile(profile)

     
      expect( JSON.parse(
        localStorage.getItem(profileKey) ?? `{}`
      )).toEqual(profile)

      userStorage.removeProfile()
      const received = localStorage.getItem(profileKey)

      expect(received).toBe(null)
    })
  })
})
