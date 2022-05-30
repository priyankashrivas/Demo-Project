import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { formatError } from '../Services/AuthServices'
import { saveTokenLocalStorage } from '../../Components/Services/AuthServices'
import useValidator from '../Validator/Validator';
import Loader from '../Loader/Loader';

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const [validator, showValidationMessage] = useValidator();
  const navigate = useNavigate()

  //  async function register()
  //   {
  //     let item={email,password}
  //     console.log(item)

  //     let result= await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8",{
  //       method:'POST',
  //       body:JSON.stringify(item),
  //       headers:{
  //         "Content-Type":'application/json',
  //         "Accept":'application/json'
  //       }
  //     })
  //     result = await result.json()
  //     console.log("result",result);
  //     saveTokenLocalStorage(result);

  //   }
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };

  const register = () => {
    if (validator.allValid()) {
      setLoading(true);
      axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8", postData)
        .then(function (response) {
          setLoading(false);
          saveTokenLocalStorage(response);
          navigate('/SignIn')
          toast.success("Registered Successfully,Please login to your account");
        }).catch(function (error) {
          setLoading(false);
          const errorMessage = formatError(error.response.data)
          let messagee = error.response.data && error.response.data.error && error.response.data.error.message
          console.log("hello", error.response.data.error.message);
          toast.error(messagee);
        });
    }
    else {
      console.log("valid");
      showValidationMessage(true);
    }
  }

  return (

    <div className="col-sm-6 offset-sm-3">
      {loading && <Loader />}
      {console.log("valid", validator)}
      <h1 className="offset-sm-4">SignUp Here</h1>
      <br />
      <input type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        placeholder="email"
      />
      {validator.message("email", email, "required|email", { className: "text-danger", })}
      <br />
      <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="password"
      />
      {validator.message("password", password, "required", { className: "text-danger", })}
      <br />
      <button onClick={register} className="offset-sm-5 btn btn-primary">Sign Up</button>
    </div>
  )
}
export default SignUp;