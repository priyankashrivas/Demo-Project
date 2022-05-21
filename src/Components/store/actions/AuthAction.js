import { formatError, signup, login  ,runLogoutTimer,
  saveTokenInLocalStorage,} from '../../services/AuthService'

export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed signup';
export const LOGIN_FAILED_ACTION = '[login action] failed signup';
export const LOGOUT_ACTION = "[logout action] logout action";
// export const SIGNUP_FAILED_ACTION

export function  signupAction (email,password) {
  return (dispatch) => {
      signup(email,password).then(response => {
               console.log(response);
               saveTokenInLocalStorage(response.data);
               dispatch(confirmedSignupAction(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data)
        dispatch(signupFailedAction(errorMessage));
        alert(errorMessage);
      })

  };
}

export function confirmedSignupAction(payload) {
   return {
       type: SIGNUP_CONFIRMED_ACTION,
       payload,
   }
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  }
}
// export const onLogin = (data, onSuccess) => ({
//   type: LOGIN,
//   payload: data,
//   onSuccess,
// });
export function  loginAction (email,password) {
  return (dispatch) => {
      login(email,password).then(response => {
               console.log(response);
               saveTokenInLocalStorage(response.data);
               dispatch(confirmedLoginAction(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data)
        dispatch(loginFailedAction(errorMessage));
      })

  };
}
//
export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  }
 }
export function confirmedLoginAction(data) {
  return {
      type: LOGIN_CONFIRMED_ACTION,
     payload:data,
  }
}

//logout action creator

export function logoutAction() {
  localStorage.removeItem("userDetails");
  
  return {
    type: LOGOUT_ACTION,
  };
}