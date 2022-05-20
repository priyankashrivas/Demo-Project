import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Input, Label } from "reactstrap";
import Loader from "../../common/loader/Loader";
import {
  loadingToggleAction,
  loginAction,
} from "../../features/actions/AuthAction";
import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { MESSAGES } from "../../config/Constant";
import useValidator from "../../common/usevalidator/useValidator";

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [validator, showValidationMessage] = useValidator();

  const onLogin = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    setErrors(errorObj);
    if (validator.allValid()) {
      dispatch(loadingToggleAction(true));
      dispatch(
        loginAction(email, password, (response) => {
          console.log(response);
          if (response.status === 200) {
            history.push("/posts");
            toastr.success("success", MESSAGES.USER_LOGIN);
          }
        })
      );
    } else {
      toastr.error("Incorrect", MESSAGES.SIGNIN_ERROR);
      showValidationMessage(true);
    }
  };

  return (
    <div>
      <div className="flex justify-center my-5">
        {/* {props.showLoading && <Loader/>} */}
        <div
          className=" shadow p-3 "
          style={{ width: "31%", marginLeft: "30%", textAlign: "center" }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "7%" }}>Sign In</h1>
          {props.errorMessage && (
            <div
              className="bg-red-300  border border-red-900 p-1 my-2"
              style={{ color: "red" }}
            >
              {props.errorMessage}
            </div>
          )}
          {props.successMessage && (
            <div
              className="bg-green-300  border border-green-900 p-1 my-2"
              style={{ color: "green" }}
            >
              {props.successMessage}
            </div>
          )}
          <form onSubmit={onLogin}>
            <div style={{ textAlign: "center" }}>
              <Label>Email <span style={{ color: "red" }}>*</span></Label>
              <div>
                <Input
                  type="text"
                  className="border border-gray-600 p-1 w-full"
                  style={{ width: "79%", marginLeft: "11%" }}
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {validator.message("email", email, "required", {
                className: "text-danger",
              })}
            </div>
            <div style={{ textAlign: "center" }}>
              <Label>Password <span style={{ color: "red" }}>*</span></Label>
              <div>
                <Input
                  type="password"
                  className="border border-gray-600 p-1 w-full"
                  value={password}
                  name="password"
                  style={{ width: "79%", marginLeft: "11%" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {validator.message("password", password, "required", {
                className: "text-danger",
              })}
            </div>
            <div className="my-3">
              <Button
                type="submit"
                className="btn btn-info text-white px-3 py-1"
                style={{ marginLeft: "2%" }}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
