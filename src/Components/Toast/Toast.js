// import React from 'react';
 
// // Importing toastify module
// import {toast} from 'react-toastify';
 
// // Import toastify css file
// import 'react-toastify/dist/ReactToastify.css';
 
//  // toast-configuration method,
//  // it is compulsory method.
// toast.configure()
 
// // This is main function
// function Toast(){
//     // function which is called when
//     // button is clicked
//     const notify = ()=>{
 
//         // Calling toast method by passing string
//         toast('Hello Geeks')
//     }
//     return (
//         <div className="hello1">
//             <button onClick={notify}>Click Me!</button>
//             </div>
//     );
// }
  
// export default Toast;
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const errorMessage = () => {
//     toast.error("Unexpected error occured");
//     toast.warning('Danger');
//     toast.success('successful');
//     // inbuilt-notification
//     toast.info('hey this is shikha');
//     // inbuilt-notification
//     toast.error('Runtime error');
//     // default notification
//     toast('Hello mam')
  };
  return (
    <div>
      {/* <button onClick={errorMessage} className="btn btn-primary">
        Submit
      </button> */}
      <ToastContainer />
    </div>
  );
};
export default Toast;