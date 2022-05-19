import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import { Label, Input, Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import useValidator from "../../common/useValidator";

const CreatePost = () => {
  const history = useHistory();
  const location = useLocation()
  console.log('location',location)
  const [validator, showValidationMessage] = useValidator();

  const postPage = () => {
    history.push("/posts");
  };

  let selecteddata = location && location.state && location.state.selectedPost
  console.log('selectedPost',selecteddata)

  const initialValues = {
    tourist_name: selecteddata ? selecteddata.tourist_name : '',
    tourist_email: selecteddata ? selecteddata.tourist_email : '',
    tourist_location:selecteddata ? selecteddata.tourist_location : '',
  };

  const [data, setData] = useState(initialValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(data);

    if (validator.allValid()) {
      axios
        .post("http://restapi.adequateshop.com/api/Tourist", data)
        .then((response) => {
          console.log("Hello", response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("valid");
      showValidationMessage(true);
    }
  };

  return (
    <div>
      {console.log("valid", validator)}
      <h3>Create Post</h3>
      <form onSubmit={submitHandler}>
        <div>
          <Label for="tourist_name">
            Name <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="text"
            name="tourist_name"
            value={data.tourist_name}
            onChange={changeHandler}
          />
          {validator.message("tourist_name", data.tourist_name, "required", {
            className: "text-danger",
          })}
        </div>

        <div>
          <Label for="tourist_email">
            Email <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="text"
            name="tourist_email"
            value={data.tourist_email}
            onChange={changeHandler}
          />
          {validator.message("tourist_email", data.tourist_email, "required", {
            className: "text-danger",
          })}
        </div>

        <div>
          <Label for="tourist_location">
            Location <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="text"
            name="tourist_location"
            value={data.tourist_location}
            onChange={changeHandler}
          />
          {validator.message("tourist_location", data.tourist_location, "required", {
              className: "text-danger",
            })}
        </div>
        <br />

        <div>
          <Button type="submit" className="btn btn-info">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
