//importing library
import axios from "axios";

//importing actions
import {
  loginConfirmedAction,
  logoutAction,
} from "../features/actions/AuthAction";

export function signup(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  //axios call for signup
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8`,
    postData
  );
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  //axios call for signin
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8`,
    postData
  );
}

//function for errors related to signin and signup
export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      return "Email already exists";
    case "INVALID_EMAIL":
      return "Invalid Email";

    case "EMAIL_NOT_FOUND":
      return "Email Not Found";
    case "INVALID_PASSWORD":
      return "Invalid Password , should be atleast 6 characters";
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

//saving token in local storage
export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(
    new Date().getTime() + tokenDetails.expiresIn * 1000
  );
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

//function for auto login
export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logoutAction(history));
    return;
  }

  //token expirey
  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    dispatch(logoutAction(history));
    return;
  }
  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
}
