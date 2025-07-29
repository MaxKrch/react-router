import createPost from "@/features/post/api/create-post";
import deletePost from "@/features/post/api/delete-post";
import loadPosts from "@/features/post/api/load-posts"
import updatePost from "@/features/post/api/update.post";
import { ROUTES } from "@/shared/const/routes"
import generatePathWithId from "@/shared/lib/router/generate-path-with-id";
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom"

export const networkLoader = async ({}: LoaderFunctionArgs) => {
    const response = await loadPosts();

    return response;
}

export const createPostAction = async ({request}: ActionFunctionArgs) => {
    const data = await request.json();
    await createPost(data);

    redirect(ROUTES.SOCIAL_NETWORK.POST_FEED)
}

export const updatePostAction = async ({request}: ActionFunctionArgs) => {
    const data = await request.json();
    await updatePost(data);

    redirect(generatePathWithId(
        ROUTES.SOCIAL_NETWORK.POST_DETAILS,
        data.id
    ))
}

export const deletePostAction = async ({params}: ActionFunctionArgs) => {
    const id = params.id
    console.log(id)
    if(!id) {
        throw new Error('Post ID is missing')
    }

    await deletePost(Number(id));

    redirect(ROUTES.SOCIAL_NETWORK.POST_FEED)
}