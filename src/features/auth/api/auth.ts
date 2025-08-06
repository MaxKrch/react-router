import { BASE_URL } from "@/config"
import fetchRequest from "@/shared/api/fetch-request/fetch-request"
import { API_ROUTES } from "@/shared/const/api-routes"
import type { AuthRequestData, UserProfile } from "@/shared/types"

type RequestLogin = AuthRequestData & {
  signal?: AbortSignal
}

export const requestLogin = async ({
  login,
  password,
  signal,
}: RequestLogin) => {
  const url = `${BASE_URL}${API_ROUTES.AUTH.url}`
  const options = {
    method: API_ROUTES.AUTH.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
    signal,
  }

  return fetchRequest<{ token: string }>({ url, options })
}

export const requestProfile = ({ signal }: { signal?: AbortSignal } = {}) => {
  const url = `${BASE_URL}${API_ROUTES.PROFILE.url}`
  const options = {
    method: API_ROUTES.PROFILE.method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  }

  return fetchRequest<UserProfile>({ url, options, auth: true })
}
