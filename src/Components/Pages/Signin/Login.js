
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  FormFeedback,
} from "reactstrap";

import "../Signup/Signup.css";
import React, { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { loginAction } from '../../store/actions/AuthAction';
import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom'

// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({props}) => {
  const dispatch = useDispatch();
  // let navigate = useNavigate()
  // const [name, setName] = useState("");
  // const [pswd, setPswd] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory()

  
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
        errorObj.email = 'Email is Required';
        error = true;
       
    }

    if (password === '') {
        errorObj.password = 'Password is Required';
        error = true;
      
    }
    
    
    setErrors(errorObj);

    if (error) return;
    dispatch(loginAction(email, password, props));
    
    toast.success("User loggedIn successfully!!");
   
    history.push('/posts')
}


  const handle = () => {
    let user = {
      // name: name,
      name: email,
      password: password
     
    };

   
    
    // localStorage.setItem("name", name);
    // localStorage.setItem("password", pswd);
  };
  return (
    <>
      <Form className="login-form" onSubmit={onLogin}>
        <div className="custom-form">
          <h4 className="text-center mb-5">Sign In </h4>

          <FormGroup>
            <Label for="exampleEmail">Username</Label>

            <Input
              type="email"
              name={"email"}
              value={email}
              placeholder="Enter your username"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>

            <Input
              type="password"
              name={"password"}
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              
            />
             {errors.password && <div className="text-danger">{errors.password}</div>}
          </FormGroup>

          {/* <input type="name" placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)} /> */}
          {/* <input type="email" placeholder="Email or Phone number" onChange={(e)=>setEmail(e.target.value)}/> */}
          {/* <input type="password" placeholder="Enter your password" onChange={(e)=>setPswd(e.target.value)} /> */}
          {/* <button onClick={handle} >Click Me</button> */}

          <FormGroup>
            {/* <Link to="/posts"> */}
            <Button className="btn" color="primary" type="submit" onClick={handle}>
              Login
            </Button>
            {/* </Link> */}
          </FormGroup>

          <div>

            {/* <div>{localStorage.getItem("name")}</div> */}
            {/* <div>{localStorage.getItem("email")}</div> */}
            {/* <div>{localStorage.getItem("password")}</div> */}
          </div>
        </div>
       
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      errorMessage: state.auth.errorMessage,
      // successMessage: state.auth.successMessage,
      showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
