import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory,useParams } from 'react-router-dom';

// import './ViewUser.css'
// import {toast} from 'react.toastify'
    

    const ViewUser = () => {
    // const [users, setUser] = useState([])
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [details,setDetails]=useState([]);

    const params = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
       
    }
    const fetchData = (id) => {
        axios.get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
        .then((response) => {
            const details=response.data;
            setDetails(details);
            console.log('hello',details);
        })}  
        
      useEffect(
        ()=>{
            fetchData();
        },[]
      )
  return (
// 
<div className="container"  style={{marginLeft: '40%',width:"100%"}}>
  
      <div  className="row d-flex flex-column">
      <center>
         <button 
          className="btn btn-dark  my-5 "
          style={{marginLeft: '1%',width:"100%"}} 
        //   onClick={() => history.push("/profile")}
        >
          View User
        </button>
        <div className="col-md-12 mx-auto shadow p-5">
         
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={details.tourist_name}
                  placeholder={"Name"}
                  disabled="disabled"
                  onChange={(e) => setName(e.target.value)}
                /><br/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={details.tourist_email}
                  placeholder={"Email"}
                  disabled="disabled"
                  onChange={(e) => setEmail(e.target.value)}
                /><br/>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={details.tourist_location}
                  placeholder={"Location"}
                  disabled="disabled"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-4" >
                <button  type="submit" className="btn btn-primary" style={{marginLeft: '5%'}} 
                onClick={() => history.push("/posts")}>
                 Go back!!
                </button>
                <button
                  type="button"
                  className="btn btn-danger" style={{marginLeft: '2%'}} 
                  onClick={() => history.push("/posts")}
                >
                  cancel
                </button>
              </div>
            </form>
        
        </div>
        </center>
      </div>
      
    </div>
  )
};

export default ViewUser;
