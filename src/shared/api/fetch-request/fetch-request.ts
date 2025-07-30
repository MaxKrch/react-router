import { STATUS } from "@/shared/const/status"
import { tokenStorage } from "@/shared/lib/storage"

type Request = {
  url: string
  auth?: boolean
  options: RequestInit
}

export type RequestResult<T> = {
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
    
    const response: RequestResult<T> = {
      status: STATUS.SUCCESS,
    }; 
    
    const isJson = resp.headers.get('content-type')?.includes('application/json')

    if (resp.status !== 204 && isJson) {
      try {
        response.data = await resp.json()
      } catch {

      }
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
