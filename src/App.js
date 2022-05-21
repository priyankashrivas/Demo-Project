// import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./Router/Routes";
import Header from './Components/common/Header/Header'
import CreatePost from "./Components/Pages/CreatePost/CreatePost";
import Toast  from "./Components/Toast/Toast";
// import EditPost  from "./Components/Pages/EditPost/EditPost";
import Filterlist  from "./Components/Pages/Filterlist/Filterlist";


import React from "react";
import Routes from "./Router/Routes";


function App() {

  
  return (
    <div>
      
      <BrowserRouter>
        <Header />
        <Toast/>
     {/* <EditPost/> */}
    {/* <Filterlist/> */}

        <CustomRoutes />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
// import React from "react";
// import Header from "./Components/common/Header/Header";
// import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
// import { lazy, Suspense, useEffect } from "react";
// import { connect, useDispatch } from "react-redux";
// import { checkAutoLogin } from "./Components/services/AuthService";
// import ReduxToastr from "react-redux-toastr";
// import { isAuthenticated } from "./Components/selectors/AuthSelectors";
// import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

// const Home = lazy(() => import("./Components/pages/home/Home"));
// const CreatePost = lazy(() =>import("./Components/Pages/CreatePost/CreatePost"));
// const EditPost = lazy(() =>import("./Components/Pages/EditPost/EditPost"));
// const SignUp = lazy(() =>import("./Components/Pages/Signup/SignUp"));
// const Login = lazy(() => import ("./Components/Pages/Signin/Login"));
// const Posts = lazy(() => import ( "./Components/Pages/Posts/Posts"));
// const ViewUser = lazy(() => import("./Components/Pages/ViewUser/ViewUser"));

// const App = (props) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     console.log(props);
//     checkAutoLogin(dispatch, props.history);
//   }, []);

//   let routes = (
//     <BrowserRouter>
//       {!props.isAuthenticated && (
//         <Switch>
//           <Route exact path="/" component={SignUp} />
//           <Route exact path="/login" component={Login} />
//           {/* <Route exact path='/home' component={Home}/> */}
//         </Switch>
//       )}
//     </BrowserRouter>
//   );

//   if (props.isAuthenticated) {
//     console.log(props.isAuthenticated);
//     routes = (
//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/posts" component={Posts} />
//           <Route exact path="/CreatePost" component={CreatePost} />
//           <Route exact path="/posts/editPost/:id" component={EditPost} />
//           <Route exact path="/posts/viewuser/:id" component={ViewUser} />
//           {/* <Route exact path="/home" component={Home} /> */}
//         </Switch>
//       </BrowserRouter>
//     );
//   }

//   return (
//     <div>
//       <BrowserRouter>
//         <Header />
//       </BrowserRouter>
//       <div>
//         <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
//         <ReduxToastr
//           timeOut={2000}
//           newestOnTop={false}
//           preventDuplicates
//           position="top-right"
//           transitionIn="fadeIn"
//           transitionOut="fadeOut"
//           progressBar
//         />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: isAuthenticated(state),
//   };
// };

// export default connect(mapStateToProps)(App);