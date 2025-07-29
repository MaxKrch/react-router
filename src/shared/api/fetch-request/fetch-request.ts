import { STATUS } from "@/shared/const/status"
import { tokenStorage } from "@/shared/lib/storage"

type Request = {
  url: string
  auth?: boolean
  options: RequestInit
}

type RequestResult<T> = {
  status: typeof STATUS.ERROR | typeof STATUS.SUCCESS
  error?: Error
  data?: T
}

const fetchRequest = async <T>(req: Request): Promise<RequestResult<T>> => {
  try {
    const token = req.auth ? tokenStorage.getToken() : null
    const fullOptions: RequestInit = {
      ...req.options,
      headers: {
        ...req.options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }

    const resp = await fetch(req.url, fullOptions)

    if (!resp.ok) throw new Error(`Bad Response`)

    const data = await resp.json()
    const response: RequestResult<T> = {
      status: STATUS.SUCCESS,
      data,
    }
    return response
  } catch (err) {
    const response: RequestResult<T> = {
      status: STATUS.ERROR,
    }

    response.error = err instanceof Error ? err : new Error(`Unknown Error`)

    return response
  }
}

export default fetchRequest
