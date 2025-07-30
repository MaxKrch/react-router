import usePost from "@/features/post/model/use-posts";
import { ROUTES } from "@/shared/const/routes";
import generatePathWithId from "@/shared/lib/router/generate-path-with-id";
import type { PostType } from "@/shared/types/posts";
import { useCallback } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

const useHandlePost = (post: PostType) => {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const { removePost } = usePost()

    const handleEditPost = useCallback(() => {
        if(!post.id) return;
        navigate(generatePathWithId(ROUTES.SOCIAL_NETWORK.EDIT_POST, post.id))
    }, [])

    const handleRemovePost = useCallback(() => {
        if(!post.id) return;
        removePost(post.id)
        fetcher.submit(null, {
            method: 'post',
            action: generatePathWithId(ROUTES.SOCIAL_NETWORK.REMOVE_POST, post.id)
        })
    }, [fetcher])

    return({
        handleEditPost,
        handleRemovePost
    })
}

export default useHandlePost