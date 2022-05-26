import React, { lazy } from "react";
import { Route, Switch } from "react-router";
import Login from "../Components/Pages/Signin/Login";
import SignUp from "../Components/Pages/Signup/SignUp";
import Profile from "../Components/Pages/Profile/Profile";
import Logout from "../Components/Pages/Logout/Logout";
import Posts from "../Components/Pages/Posts/Posts";
import CreatePost from "../Components/Pages/CreatePost/CreatePost";
// import UpdateUser from "../Components/Pages/updateUser/UpdateUser";
import EditPost from "../Components/Pages/EditPost/EditPost";
import ViewUser from "../Components/Pages/ViewUser/ViewUser";


const Routes = () => {
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Switch>
          
        <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/login"  >
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/posts">
            <Posts />
          </Route>

          <Route exact path="/cpost">
            <CreatePost />
          </Route>
          <Route exact path="/posts/viewuser/:id" >
            <ViewUser />
          </Route>
          <Route exact path="/posts/editPost/:id">
            <EditPost/>
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>

           {/* <Route exact path="/edit_post/:id">
           <EditPost />
           </Route> */}
        </Switch>
      </div>
    </div>
  );
};

export default Routes;
