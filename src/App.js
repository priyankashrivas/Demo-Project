//importing hooks
import React from "react";
import { connect, useDispatch } from "react-redux";

//importing from components
import Header from "./Components/common/Header/Header";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ReduxToastr from "react-redux-toastr";

//importing css of redux toastr
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

//importing from components
import { checkAutoLogin } from "./Components/services/AuthService";
import { isAuthenticated } from "./Components/selectors/AuthSelectors";

//use lazy library for routing
const Home = lazy(() => import("./Components/pages/home/Home"));
const CreatePost = lazy(() =>
  import("./Components/pages/createpost/CreatePost")
);
const SignUp = lazy(() => import("./Components/pages/signup/SignUp"));
const Login = lazy(() => import("./Components/pages/signin/Login"));
const Posts = lazy(() => import("./Components/pages/posts/Posts"));
const ViewUser = lazy(() => import("./Components/pages/viewuser/ViewUser"));

const App = (props) => {
  const dispatch = useDispatch();

  //auto login on not login and on not token expiry
  useEffect(() => {
    console.log(props);
    checkAutoLogin(dispatch, props.history);
  }, []);

  //routes for when not authenticated
  let routes = (
    <BrowserRouter>
      {!props.isAuthenticated && (
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path='/home' component={Home}/> */}
        </Switch>
      )}
    </BrowserRouter>
  );

  //routes for when authenticated
  if (props.isAuthenticated) {
    console.log(props.isAuthenticated);
    routes = (
      <BrowserRouter>
        <Switch>
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/createpost" component={CreatePost} />
          <Route exact path="/posts/updatePost/:id" component={CreatePost} />
          <Route exact path="/posts/viewuser/:id" component={ViewUser} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      <div>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
        {/* redux toastr attributes */}
        <ReduxToastr
          timeOut={2000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
      </div>
    </div>
  );
};

//mapStateToProps for authentication
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default connect(mapStateToProps)(App);
