const AUTH_TOKEN = {
  STORAGE: localStorage,
  KEY: `token`,
} as const

export const tokenStorage = {
  getToken: () => AUTH_TOKEN.STORAGE.getItem(AUTH_TOKEN.KEY),
  setToket: (token: string) =>
    AUTH_TOKEN.STORAGE.setItem(AUTH_TOKEN.KEY, token),
  removeToken: () => AUTH_TOKEN.STORAGE.removeItem(AUTH_TOKEN.KEY),
}
