// import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./Router/Routes";
import Header from './Components/common/Header/Header'
import CreatePost from "./Components/Pages/CreatePost/CreatePost";
import Toast  from "./Components/Toast/Toast";
// import EditPost  from "./Components/Pages/EditPost/EditPost";

import React from "react";


function App() {

  
  return (
    <div>
      <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Toast/>
     {/* <EditPost/> */}
    
        <CustomRoutes />
      </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
