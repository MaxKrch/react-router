import { BASE_URL } from "@/config";
import fetchRequest from "@/shared/api/fetch-request/fetch-request";
import { API_ROUTES } from "@/shared/const/api-routes";
import type { PostType } from "@/shared/types/posts";

const createPost = (data: Partial<PostType>) => {
    const url = `${BASE_URL}${API_ROUTES.CREATE_POST.url}`
    const options = {
        method: API_ROUTES.CREATE_POST.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetchRequest({
        url,
        options
    })
}

export default createPost