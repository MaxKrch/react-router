import type { UserProfile } from "@/shared/types"

const PROFILE = {
  STORAGE: localStorage,
  KEY: `profile`,
}

export const userStorage = {
  getProfile: () => {
    try {
      const profileJSON = PROFILE.STORAGE.getItem(PROFILE.KEY)
      return profileJSON ? JSON.parse(profileJSON) : null
    } catch {
      return null
    }
  },
  setProfile: (profile: UserProfile) =>
    PROFILE.STORAGE.setItem(PROFILE.KEY, JSON.stringify(profile)),
  removeProfile: () => PROFILE.STORAGE.removeItem(PROFILE.KEY),
}