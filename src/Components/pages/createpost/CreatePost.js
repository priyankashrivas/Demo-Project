import React, { useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import { Label, Input, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import useValidator from "../../common/usevalidator/useValidator";
import { toastr } from "react-redux-toastr";

import { MESSAGES } from "../../config/Constant";

import { useDispatch, useSelector } from "react-redux";
import { API } from "../../config/ApiUrl";

const CreatePost = () => {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  const [validator, showValidationMessage] = useValidator();

  const user = useSelector((state) => state.users);
  const selectedUser = user.posts;
  // console.log("selectorUser", selectedUser.id)
  const userId = selectedUser.id;
  console.log(userId);

  const initialValues = {
    tourist_name: selectedUser ? selectedUser.tourist_name : "",
    tourist_email: selectedUser ? selectedUser.tourist_email : "",
    tourist_location: selectedUser ? selectedUser.tourist_location : "",
  };

  const [data, setData] = useState(initialValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //handleSubmit 
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(selectedUser){
  //     console.log('update')
  //    updateUserHandler()
  //   }
  //   else (
  //     createUserHandler()
  //   )

  // }



  //Create User api
  const createUserHandler = (e) => {
    // e.preventDefault();
    if (validator.allValid()) {
      axios
        .post("http://restapi.adequateshop.com/api/Tourist", data)
        .then((response) => {
          console.log("New User", response);

          toastr.success("Success", MESSAGES.USER_CREATED_SUCCESSFULLY, {autoClose: 10000});
          console.log("created new user")
          history.push("/posts");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      showValidationMessage(true);
    }
  };

  const backToPost = () => {
   window.location.assign('/posts')
   
  };

  //update user details
  function updateUserHandler(e) {
    e.preventDefault();

    const reqData = {
      id: params.id,
      tourist_name: data.tourist_name,
      tourist_email: data.tourist_email,
      tourist_location: data.tourist_location,
    };

    const request = axios
      .put(`${API.updateUsers}/${params.id}`, reqData)
      .then((res) => {
        console.log("response", res);
       
        toastr.success("Success", MESSAGES.USER_UPDATED_SUCCESSFULLY, {autoClose: 10000});
          console.log("Updated User")
          history.push('/posts')
          window.location.reload()
          
        
      })
      .catch((error) => {
        console.log("error", error.response);
        
      });
  }

  return (
    <div>
      <h3>Create Post/ Edit Post</h3>
      <button
        className="btn btn-outline-secondary"
        style={{ marginLeft: "92%" }}
        onClick={() => backToPost()}
      >
        Back to Posts
      </button>
      <form>
        <div>
          <Label for="tourist_name">
            Name <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="text"
            name="tourist_name"
            placeholder="Enter your name"
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
            placeholder="Enter your email"
            value={data.tourist_email}
            onChange={changeHandler}
          />
          {}
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
            placeholder="Enter your location"
            value={data.tourist_location}
            onChange={changeHandler}
          />
          {validator.message(
            "tourist_location",
            data.tourist_location,
            "required",
            {
              className: "text-danger",
            }
          )}
        </div>
        <br />

        <div style={{ marginLeft: "40%" }}>
          <Button className="btn btn-success me-3" onClick={createUserHandler} >Create Post +</Button>
          <Button className="btn btn-success me-3" onClick={updateUserHandler} >
            Update Details
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
