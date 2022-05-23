//importing hooks
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//importing components
import useValidator from "../../common/usevalidator/useValidator";
import { Label, Input, Button } from "reactstrap";
import { MESSAGES } from "../../config/Constant";
import { API } from "../../config/ApiUrl";
import Loader from "../../common/loader/Loader";

//importing libraries
import { toastr } from "react-redux-toastr";
import axios from "axios";

//importing css
import "./CreatePost.css";

const CreatePost = () => {
  const history = useHistory();
  const params = useParams();

  //state for loader
  const [loading, setLoading] = useState(false);
  const [validator, showValidationMessage] = useValidator();

  //useSelector for specific id data
  const user = useSelector((state) => state.users);
  const selectedUser = user.posts;
  const userId = selectedUser.id;
  console.log(userId);

  const initialValues = {
    tourist_name: selectedUser ? selectedUser.tourist_name : "",
    tourist_email: selectedUser ? selectedUser.tourist_email : "",
    tourist_location: selectedUser ? selectedUser.tourist_location : "",
  };
  //state for data
  const [data, setData] = useState(initialValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //Create New Tourist
  const createUserHandler = () => {
    setLoading(true);
    if (validator.allValid()) {
      axios
        .post("http://restapi.adequateshop.com/api/Tourist", data)
        .then((response) => {
          console.log("New User", response);

          setLoading(true);
          toastr.success("Success", MESSAGES.USER_CREATED_SUCCESSFULLY, {
            autoClose: 10000,
          });
          window.location.assign("/posts");
        })

        .catch((error) => {
          console.log("ERROR", error.response.data.Message);
          toastr.error("Failed", error.response.data.Message);
        });
    } else {
      showValidationMessage(true);
    }
  };

  const backToPost = () => {
    window.location.assign("/posts");
  };

  //update user details
  function updateUserHandler(e) {
    setLoading(true);
    if (validator.allValid()) {
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
          setLoading(true);
          toastr.success("Success", MESSAGES.USER_UPDATED_SUCCESSFULLY, {
            autoClose: 10000,
          });
          console.log("Updated User");
          history.push("/posts");
          window.location.reload();
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    } else {
      showValidationMessage(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <h3 className="text-center mt-5">
        Add New Tourist/ Update Tourist's Details
      </h3>
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

          {validator.message(
            "tourist_email",
            data.tourist_email,
            "required|email",
            {
              className: "text-danger",
              message: "Invalid email",
            }
          )}
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
          <Button className="btn btn-success me-3" onClick={createUserHandler}>
            Create Post +
          </Button>
          <Button className="btn btn-success me-3" onClick={updateUserHandler}>
            Update Details
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
