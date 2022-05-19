import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/signin/Login";
import Posts from "../pages/posts/Posts";
import CreatePost from '../pages/createpost/CreatePost'

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login}/>
          <Route path="/createpost" component={CreatePost}/>
          <Route path="/posts" component={Posts} />
        </Switch>
     </BrowserRouter>
    </div>
  );
};

export default Routes;
