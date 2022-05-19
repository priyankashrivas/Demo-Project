// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { useHistory, useParams } from "react-router";
// import { toast } from "react-toastify";

// const EditContact = ({ contacts, updateContact }) => {
//   const { id } = useParams();
//   const history = useHistory();
//   const currentContact = contacts.find(
//     (contact) => contact.id === parseInt(id)
//   );

//   useEffect(() => {
//     setName(currentContact.name);
//     setEmail(currentContact.email);
//     setPhone(currentContact.phone);
//   }, [currentContact]);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const checkContactEmailExists = contacts.filter((contact) =>
//       contact.email === email && contact.id !== currentContact.id
//         ? contact
//         : null
//     );
//     const checkContactPhoneExists = contacts.filter((contact) =>
//       contact.phone === phone && contact.id !== currentContact.id
//         ? contact
//         : null
//     );

//     if (!email || !name || !phone) {
//       return toast.warning("Please fill in all fields!!");
//     }
//     if (checkContactEmailExists.length > 0) {
//       return toast.error("This email already exists!!");
//     }
//     if (checkContactPhoneExists.length > 0) {
//       return toast.error("This phone number already exists!!");
//     }

//     const data = {
//       id: currentContact.id,
//       email,
//       name,
//       phone,
//     };

//     updateContact(data);
//     toast.success("Contact updated successfully!!");
//     history.push("/");
//   };

//   return (
//     <div className="container">
//       <div className="row d-flex flex-column">
//         <button
//           className="btn btn-dark ml-auto my-5"
//           onClick={() => history.push("/")}
//         >
//           Go back
//         </button>
//         <div className="col-md-6 mx-auto shadow p-5">
//           {currentContact ? (
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={name}
//                   placeholder={"Name"}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={email}
//                   placeholder={"Email"}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={phone}
//                   placeholder={"Phone"}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//               <div className="form-group d-flex align-items-center justify-content-between my-2">
//                 <button type="submit" className="btn btn-primary">
//                   Update Contact
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => history.push("/")}
//                 >
//                   cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <h1 className="text-center">No Contact Found</h1>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   contacts: state,
// });
// const mapDispatchToProps = (dispatch) => ({
//   updateContact: (data) => {
//     dispatch({ type: "UPDATE_CONTACT", payload: data });
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EditContact);

// import '././App.css'
//-----------------------------------------------------------------------
// import React, { useEffect, useState } from 'react'
// function App() {
//   const [users, setUser] = useState([])
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [location, setLocation] = useState("");
//   const [userId,setUserId]=useState(null)

//   useEffect(() => {
//     getUsers();
//   }, [])
//   function getUsers() {
//     fetch("http://localhost:4000/todo").then((result) => {
//       result.json().then((resp) => {
//         // console.warn(resp)
//         setUser(resp)
//         setName(resp[0].name)
//         setLocation(resp[0].location)
//         setEmail(resp[0].email)
//         setUserId(resp[0].id)
//       })
//     })
//   }


//   function selectUser(id)
//   {
//     let item=users[id-1];
//     setName(item.name)
//         setEmail(item.email)
//         setLocation(item.location);
//         setUserId(item.id)
//   }
//   function updateUser()
//   {
//     let item={name,location,email}
//     console.warn("item",item)
//     fetch(`http://localhost:4000/todo/${userId}`, {
//       method: 'PUT',
//       headers:{
//         'Accept':'application/json',
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify(item)
//     }).then((result) => {
//       result.json().then((resp) => {
//         console.warn(resp)
//         getUsers()
//       })
//     })
//   }
//   return (
//     <div className="App">
//       <h1>Update User Data With API </h1>
//       <table border="1">
//         <tbody>
//           <tr>
//             <td>ID</td>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Location</td>

//           </tr>
//           {
//             users.map((item, i) =>
//               <tr key={i}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.location}</td>
//                 {/* <td><button onClick={() => deleteUser(item.id)}>Delete</button></td> */}
//                 <td><button onClick={() => selectUser(item.id)}>Update</button></td>

//               </tr>
//             )
//           }
//         </tbody>
//       </table>
//       <div>
//       <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} /> <br /><br />
//         <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} /> <br /><br />
//         <input type="text" value={location}  onChange={(e)=>{setLocation(e.target.value)}} /> <br /><br />
//         <button onClick={updateUser} >Update User</button>  
//       </div>
//     </div>
//   );
// }
// export default App;
//---------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from "reactstrap";
import {  useHistory, useParams } from 'react-router-dom';
//import { useNavigate, useParams } from 'react-router-dom';

import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const EditPost = () => 
{

// const navigate = useNavigate();
 const history=useHistory();

  let [selectedData, setData] = useState('')
  let initialValues = {
  tourist_name: '',
  tourist_email: '',
  tourist_location: ''
};
const [user, setUser] = useState(initialValues);
let params = useParams()
const fetchData = async () => {
await axios
.get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
.then((res) => {
const posts = res.data;
setData(posts);
let initialValues = {
tourist_name: posts && posts.tourist_name,
tourist_email: posts && posts.tourist_email,
tourist_location: posts && posts.tourist_location,
        };
        setUser(initialValues)
        console.log(posts.data);

      });

  };
  useEffect(() => {

    fetchData();

  }, []);
  console.log('params', selectedData)
  const changeHandler = (e) => {
  const { name, value } = e.target;
  setUser({
  ...user,
[name]: value,
});
};
  const handelSubmitEditUser = (event) => {
  event.preventDefault();
 EditPost();
}

  const EditPost = (id) => {
    axios.put(`http://restapi.adequateshop.com/api/Tourist/${params.id}`, {
      id: params.id,
      tourist_name: user.tourist_name,
      tourist_email: user.tourist_email,
      tourist_location: user.tourist_location
    }).then((res) => {

      if (res) {
        console.log('hello')
        const notify = toast.success('Edited Successfully');
        setTimeout(function () {
          // navigate('/PostList')
        }, 5000);

        //    
      }
    }).catch(function (error) {
    console.log(error)
    })
  }
  return (
    <div><h3>Edit User Here</h3>
      < ToastContainer />
      <form onSubmit={handelSubmitEditUser}>
        <div>
          <Label for="tourist-name">Name</Label>
          <Input
            type="text"
            name="tourist_name"
            value={user.tourist_name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label for="tourist_email">Email</Label>
          <Input
            type="text"
            name="tourist_email"
            value={user.tourist_email}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label for="tourist_location">Location</Label>
          <Input
            type="text"
            name="tourist_location"
            value={user.tourist_location}
            onChange={changeHandler}
          />
        </div>
        <br />
        <Button type="submit" className="btn btn-info">
          Edit User
        </Button>
      </form>
    </div>
  );
}



export default EditPost;