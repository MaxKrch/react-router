import { useCallback, useContext } from "react"
import { PostContextDispatch, PostContextState } from "./PostContext"
import type { PostType } from "@/shared/types/posts"
import { ACTIONS } from "./postsReducer"

const usePostState = () => useContext(PostContextState)

const usePostDispatch = () => {
    const dispatch = useContext(PostContextDispatch);
    if(!dispatch) throw new Error("usePostDispatch must to be used with PostProvider")

    const setPost = useCallback((posts: PostType[]) => dispatch({
        type: ACTIONS.SET_POSTS,
        payload: posts
    }), [dispatch]);

    const addPost = useCallback((post: PostType) => dispatch({
        type: ACTIONS.ADD_POST,
        payload: post
    }), [dispatch]);

    const updatePost = useCallback((post: PostType) => dispatch({
        type: ACTIONS.UPDATE_POST,
        payload: post
    }), [dispatch]);

    const removePost = useCallback((id: PostType['id']) => dispatch({
        type: ACTIONS.REMOVE_POST,
        payload: id
    }), [dispatch]);

    return {
        setPost,
        addPost,
        updatePost,
        removePost
    }
}

const usePostActions = () => ({
    state: usePostState(),
    ...usePostDispatch()
})

export default usePostActions;
