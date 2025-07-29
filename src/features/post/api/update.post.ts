import { BASE_URL } from "@/config";
import fetchRequest from "@/shared/api/fetch-request/fetch-request";
import { API_ROUTES } from "@/shared/const/api-routes";
import type { PostType } from "@/shared/types/posts";

const updatePost = (post: PostType) => {
    const targetApi = API_ROUTES.UPDATE_POST(post.id);
    const url = `${BASE_URL}${targetApi.url}`;
    const options = {
        method: targetApi.method,
        headers: {
            'Content-Type': 'application/json'            
        },
        body: JSON.stringify(post)
    }

    return fetchRequest({
        url,
        options
    })
}

export default updatePost;