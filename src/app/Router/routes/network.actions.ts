import createPost from "@/features/post/api/create-post";
import deletePost from "@/features/post/api/delete-post";
import loadPosts from "@/features/post/api/load-posts"
import updatePost from "@/features/post/api/update-post";
import { ROUTES } from "@/shared/const/routes"
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom"

export const networkLoader = async ({}: LoaderFunctionArgs) => {
    const response = await loadPosts();

    return response;
}

export const createPostAction = async ({request}: ActionFunctionArgs) => {
    const data = await request.formData();
    const post = Object.fromEntries(data.entries())
    const result = await createPost(post);

    return result;
}

export const updatePostAction = async ({request}: ActionFunctionArgs) => {
    const data = await request.formData();
    const post = Object.fromEntries(data.entries())
    
    if (!post.id) {
        throw new Error("Post ID is missing");
    }
    
    const result = await updatePost(post);

    return result;
}
   

export const deletePostAction = async ({params}: ActionFunctionArgs) => {
    const id = params.id

    if(!id) {
        throw new Error('Post ID is missing')
    }

    await deletePost(Number(id));

    return redirect(ROUTES.SOCIAL_NETWORK.POST_FEED)
}