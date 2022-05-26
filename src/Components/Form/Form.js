import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

//Importing Libraries
import useValidator from '../Validator/Validator';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

//Importing Css
import "./Form.css";

export const Form = () => {
  const initialValues = { name: "", email: "", address: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [validator, showValidationMessage] = useValidator();
  const [loading, setLoading] = useState(false);

  //Create UserId 
  const sendData = () => {
    setLoading(true);
    if (validator.allValid()) {
      axios.post('http://restapi.adequateshop.com/api/Tourist', {
        tourist_email: formValues.email,
        tourist_name: formValues.name,
        tourist_location: formValues.address
      })
        .then(function (response) {
          console.log(response);
          setLoading(true);
          toast.success(response.message)
          const notify = toast.success('Created Successfully');
          setTimeout(function () {
            navigate('/PostList')
          }, 3000);

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
    setFormValues({ ...formValues, [name]: value });

  };

  const handleSubmit = (e) => {
    setLoading(true);
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
      {loading && <Loader />}
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
          {validator.message("email", formValues.email, "required|email", { className: "text-danger", })}
        </div>

        <p>{formErrors.email}</p>
        <br></br>
        <div className="field">
          <label>Address</label>
          <input type='text' className="form-control" name='address' placeholder='address' value={formValues.address}
            onChange={handleChange}
          />
          {validator.message("address", formValues.address, "required", { className: "text-danger", })}
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