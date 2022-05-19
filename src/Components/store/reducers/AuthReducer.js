import { SIGNUP_CONFIRMED_ACTION, SIGNUP_FAILED_ACTION } from "../actions/AuthAction";

const initialState = {
  auth: {
    email: '',
    idToken: '',
    localId: '',
    expiresIn: '',
    refreshToken: '',
  },
 errorMessage: '',
 
};

export function AuthReducer(state = initialState, action) {
  if(action.type === SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
    };
  }
  if(action.type === SIGNUP_FAILED_ACTION) {
    return {
      ...state,
      errorMessage: action.payload,
    };
  }
  return state;
}