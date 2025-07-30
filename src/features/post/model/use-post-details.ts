import usePost from "@/features/post/model/use-posts";
import type { PostType } from "@/shared/types/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const usePostDetails = () => {
    const [post, setPost] = useState<PostType | null>(null);
    const location = useParams();
    const id = Number(location.id)
    const { state } = usePost()

    useEffect(() => {
        const post = state.find(post => post.id === id) ?? null
        setPost(post)
    }, [id])

    return post
}

export default usePostDetails