import type { Post } from "@/shared/types/posts"
import type { State } from "./PostContext";

export const ACTIONS = {
    SET_POSTS: 'set_posts',
    ADD_POST: 'add_post',
    UPDATE_POST: 'update_post',
    REMOVE_POST: 'remove_post'
} as const

export type ACTIONS_TYPE = 
    | { type: typeof ACTIONS.SET_POSTS, payload: Post[] } 
    | { type: typeof ACTIONS.ADD_POST, payload: Post }
    | { type: typeof ACTIONS.UPDATE_POST, payload: Post }
    | { type: typeof ACTIONS.REMOVE_POST, payload: Post['id'] }

const postReducer = (state: State, action: ACTIONS_TYPE) => {
    switch(action.type) {
        case ACTIONS.SET_POSTS:
            return action.payload;
            
        case ACTIONS.ADD_POST:
            return [...state, action.payload];

        case ACTIONS.UPDATE_POST:
            return state.map(post => post.id === action.payload.id ? action.payload : post);

        case ACTIONS.REMOVE_POST:
            return state.filter(post => post.id !== action.payload)

        default:
            return state;
    }
}

export default postReducer