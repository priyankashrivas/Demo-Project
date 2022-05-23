//importing posts action from actions
import { CONFIRMED_EDIT_USER_ACTION } from "../actions/PostAction";

const initialState = {
  posts: [],
};

//posts reducer for update user details
export default function PostsReducer(state = initialState, actions) {
  switch (actions.type) {
    case CONFIRMED_EDIT_USER_ACTION:
      return {
        ...state,
        posts: actions.payload,
      };
    default:
      return state;
  }
}
