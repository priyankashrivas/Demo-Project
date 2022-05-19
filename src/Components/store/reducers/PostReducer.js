import { SIGNUP_CONFIRMED_ACTION, SIGNUP_FAILED_ACTION } from "../actions/PostAction";
const intialState = {
    products: [],
  };
  
  export const UpdateUserReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.SELECTED_USER:
        return { ...state, posts: payload };
      default:
        return state;
    }
  };
  
  export const selectedUpdateUserReducer = (state = {}, { type, payload }) => {
    console.log(type);
    switch (type) {
      case ActionTypes.SELECTED_USER:
        return { ...state, ...payload };
      case ActionTypes.UPDATE_SELECTED_USER:
        return {};
      default:
        return state;
    }
  }
