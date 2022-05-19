import axios from "axios";

export function signup(email,password) {

    const postData = {
        email,
         password, 
         returnSecureToken: true,
    }
    //axios call
    return axios.post( `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8`, postData);
}
export function login(email,password) {

    const postData = {
        email,
         password, 
         returnSecureToken: true,
    }
    //axios call
    return axios.post( `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8`, postData);
}

export function formatError(errorResponse) {
    switch(errorResponse.error.message) {
        case "EMAIL_EXISTS":
         return 'Email already exists';

         case "INVALID_EMAIL":
        return 'Email is not valid';

        case "EMAIL_NOT_FOUND":
        return "Email Not Found";
      
        case "INVALID_PASSWORD":
        return "Invalid Password";
      
        case "USER_DISABLED":
        return "User Disabled";
         default:
             return '';
    }
}