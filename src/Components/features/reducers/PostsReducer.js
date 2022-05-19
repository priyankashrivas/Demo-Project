import { CONFIRMED_EDIT_USER_ACTION } from '../actions/PostAction'

const initialState = {
    posts: [],
}

export default function PostsReducer(state= initialState, actions) {
    switch(actions.type) {
        case CONFIRMED_EDIT_USER_ACTION:
            return {
                ...state,
                posts : actions.payload,

            };
            default: 
            return state
    }
}

