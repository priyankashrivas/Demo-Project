import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signup,
} from "../../services/AuthService";

//login action types

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";

//toggle
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";

//signin action types
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";

//logout
export const LOGOUT_ACTION = "[logout action] logout action";

//signup function
export function signupAction(email, password) {
  return (dispatch) => {
    signup(email, password)
      .then((response) => {
        console.log(response);
        saveTokenInLocalStorage(response.data);
        // runLogoutTimer(dispatch, response.data.expiresIn * 10000000000);
        dispatch(loadingToggleAction(false));
        dispatch(confirmedSignupAction(response.data));
      })
      .catch((error) => {
        dispatch(loadingToggleAction(false));
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

//login function

export function loginAction(email, password) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        console.log(response);
        saveTokenInLocalStorage(response.data);
        dispatch(loadingToggleAction(false));
        dispatch(loginConfirmedAction(response.data));
      })
      .catch((error) => {
        dispatch(loadingToggleAction(false));
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

//login action creator

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

//signup action creator

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

//logout action creator

export function logoutAction() {
  localStorage.removeItem("userDetails");
  
  return {
    type: LOGOUT_ACTION,
  };
}
//loader action creator

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
