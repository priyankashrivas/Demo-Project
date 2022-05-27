import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {saveTokenLocalStorage} from '../../Components/Services/AuthServices'
import useValidator from '../Validator/Validator';
import {formatError} from '../Services/AuthServices'
import Loader from '../Loader/Loader';

function SignIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("") 
    const navigate = useNavigate()
    const [validator, showValidationMessage] = useValidator();
    const initialValues = { email: "", password: "" };
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    
// async function login()
// {
//     console.log(email,password);
//     let item = {email,password};
//     let result = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8",{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": 'application/json'
//         },
//         body:JSON.stringify(item)
//     });
//     result = await result.json();
//     saveTokenLocalStorage(result);
//     navigate('/PostList')
// }
const postData = {
    email,
    password,
    returnSecureToken: true,
};
const login = () => {
    setLoading(true);
    if (validator.allValid()){
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX-2V2V0v28SnccwOU4uq4kjzVNYvvka8",postData)
    .then(function(response) {
        setLoading(true);
        console.log("response",response);
        saveTokenLocalStorage(response);
        const notify = toast.success('Login Successfully')
        setTimeout(function () {
            navigate('/PostList')
          }, 3000);;
    }).catch(function(error){
        const errorMessage = formatError(error.response.data)
        let messagee = error.response.data && error.response.data.error && error.response.data.error.message
        console.log(error.response.data.error.message);
        toast.error(messagee);
        
    });
} else {
    console.log("valid");
    showValidationMessage(true);
}
// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
// }
}
  return (
   <div>
       {loading && <Loader />}
       {console.log("valid", validator)}
      <div className="col-sm-6 offset-sm-3">
       <h2 className=" offset-sm-4">Login Page</h2>
       <br /> 
           <input type="text" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" 
           />
           {validator.message("email", email, "required|email", { className: "text-danger", })}
           <br /> 
           <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
            />
           {validator.message("password", password, "required", { className: "text-danger", })}
           <br />
           <button onClick={login} className="offset-sm-5 btn btn-primary">Sign In</button> 
       </div>
   </div>
  )                    
}

export default SignIn;