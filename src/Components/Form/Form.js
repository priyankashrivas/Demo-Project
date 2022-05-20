import React, { useState, useEffect } from 'react'
import "./Form.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useValidator from '../Validator/Validator';
import { toast } from 'react-toastify';

export const Form = () => {
  const initialValues = { name: "", email: "", address: "" };
  const [formValues, setFormVaues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [validator, showValidationMessage] = useValidator();

  const sendData = () => {
    if (validator.allValid()) {
      axios.post('http://restapi.adequateshop.com/api/Tourist', {
        tourist_email: formValues.email,
        tourist_name: formValues.name,
        tourist_location: formValues.address
      })
        .then(function (response) {
          console.log(response);
          toast.success(response.message)
          console.log("navigate")
          navigate("/postlist")


        }).catch(function (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.Message)

          }
        });
    } else {
      console.log("valid");
      showValidationMessage(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVaues({ ...formValues, [name]: value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      console.log(formValues);
      sendData();
    }
  };


  console.log('formErrors', formErrors)
  const navigate = useNavigate();

  return (
    <div>
      {console.log("valid", validator)}
      <h1 className='text-align:center'>Form</h1>
      <div className="ui divider"></div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="col-sm-2 col-form-label">Name</label>
          <input type='text' className="form-control" name='name' placeholder='username' value={formValues.name}
            onChange={handleChange}
          />
          {validator.message("name", formValues.name, "required", { className: "text-danger", })}
        </div>

        <p>{formErrors.name}</p>
        <br></br>
        <div className="field">
          <label>Email</label>
          <input type='text' className="form-control" name='email' placeholder='email' value={formValues.email}
            onChange={handleChange}
          />
          {validator.message("Email", formValues.email, "required", { className: "text-danger", })}

        </div>
        <p>{formErrors.email}</p>
        <br></br>
        <div className="field">
          <label>Address</label>
          <input type='text' className="form-control" name='address' placeholder='address' value={formValues.address}
            onChange={handleChange}
          />
          {validator.message("Address", formValues.address, "required", { className: "text-danger", })}
        </div>
        <p>{formErrors.address}</p>
        <br />
        <div>
          <button>submit</button>
        </div>
      </form>
    </div>
  )
}
export default Form;