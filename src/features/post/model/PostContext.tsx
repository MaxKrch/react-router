import type { Post } from "@/shared/types/posts";
import { createContext, useReducer, type Dispatch, type PropsWithChildren } from "react";
import type { ACTIONS_TYPE } from "./postsReducer";
import postReducer from "./postsReducer";

const initState: Post[] = [];
export type State = typeof initState

export const PostContextState = createContext(initState);
export const PostContextDispatch = createContext<Dispatch<ACTIONS_TYPE> | undefined>(undefined)

const PostContext = ({children}: PropsWithChildren) => {
    const [state, dispatch] = useReducer(postReducer, initState);

    return(
        <PostContextState.Provider value={state}>
            <PostContextDispatch.Provider value={dispatch}>
                {children}
            </PostContextDispatch.Provider>
        </PostContextState.Provider>
    )
}

export default PostContext