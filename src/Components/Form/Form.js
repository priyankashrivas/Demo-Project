import React, { useState,useEffect } from 'react'
import "./Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
//import "./Validation";


export const Form = () => {
  const initialValues = {name: "", email: "", address: ""};
  const [formValues, setFormVaues] = useState(initialValues);
  const [formErrors, setFormErrors] =useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const sendData = async() =>{
    axios.post('http://restapi.adequateshop.com/api/Tourist',{
      tourist_email : formValues.email,
      tourist_name: formValues.name,
      tourist_location: formValues.address
    })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVaues({ ...formValues, [name]: value});
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
   
   
  };
  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      sendData();
      navigate('/PostList');

    }

  },[formErrors]);

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(values.name === '') {
      errors.name = "name is required!";
    }
    if(values.email === '') {
      errors.email = "email is required!";
    } else if(!regex.test(values.email)) {
      errors.email = "This is not a valid email format!"
    }
    if(values.address === '') {
      errors.address = "address is required!";
    }
    return errors;
  };

  console.log('formErrors', formErrors)
  const navigate = useNavigate();

  return (
    <div>
      
        <h1 className='text-align:center'>Form</h1>
        <div className="ui divider"></div>
        <form onSubmit={handleSubmit}>
        <div className="field">
            <label className="col-sm-2 col-form-label">Name</label>
            <input type='text' className="form-control" name='name' placeholder='username' value={formValues.name}
            onChange={handleChange}
            ></input>
        </div>
        <p>{formErrors.name}</p>
        <br></br>
        <div className="field">
            <label>Email</label>
            <input type='text'  className="form-control" name='email' placeholder='email' value={formValues.email}
            onChange={handleChange}
            ></input>
        </div>
        <p>{formErrors.email}</p>
        <br></br>
        <div className="field">
            <label>Address</label>
            <input type='text' className="form-control" name='address' placeholder='address' value={formValues.address}
            onChange={handleChange}
            ></input>
        </div>
        <p>{formErrors.address}</p>
        <br/>
        <div>
         <button>submit</button>
        </div>
        </form>
    </div>
  )
}
export default Form;