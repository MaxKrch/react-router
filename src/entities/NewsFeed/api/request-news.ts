import { BASE_URL } from "@/config"
import fetchRequest from "@/shared/api/fetch-request/fetch-request"
import { API_ROUTES } from "@/shared/const/api-routes"
import type { NewsType } from "@/shared/types/news"

const requestNews = async () => {
    const url = `${BASE_URL}${API_ROUTES.NEWS.url}`
    const options = {
        method: API_ROUTES.NEWS.method,
        headers: {
           'content-type': 'application/json',
        }
    }

    return fetchRequest<NewsType[]>({
        url,
        auth: true,
        options
    })
}

export default requestNews