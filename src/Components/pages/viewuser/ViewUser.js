import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";

const ViewUser = () => {
  const params = useParams();
  const history = useHistory();
  const [details, setDetails] = useState([]);

  //View user details by id
  const fetchUserById = async (id) => {
    await axios
      .get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
      .then((res) => {
        const details = res.data;
        setDetails(details);

        history.push(`/posts/viewuser/${params.id}`);
      });
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  //back to post
  const backToPost = () => {
   window.location.assign('/posts')
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2%" }}>
      <h4>User Details of: {details.id}</h4>
      {
        <ul style={{ listStyleType: "none" }}>
          <li>
            <b>Tourist Name:</b> {details.tourist_name}
          </li>
          <li>
            <b>Tourist Email:</b> {details.tourist_email}
          </li>
          <li>
            <b>Tourist Location</b> {details.tourist_location}
          </li>
        </ul>
      }{" "}
      <div className="mt-5">
       
          <button 
          className="btn btn-outline-info"
          onClick={() => backToPost()}
          >
            Back to posts
            </button>
      
      </div>
    </div>
  );
};

export default ViewUser;
