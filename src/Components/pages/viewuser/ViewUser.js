//importing from hooks
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

//importing from library
import axios from "axios";

//importing from component
import Loader from "../../common/loader/Loader";

const ViewUser = () => {
  const params = useParams();
  const history = useHistory();

  //for data
  const [details, setDetails] = useState([]);

  //for loader
  const [loading, setLoading] = useState(false);

  //View user details by id
  const fetchUserById = async (id) => {
    setLoading(true);
    await axios
      .get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
      .then((res) => {
        const details = res.data;
        setDetails(details);
        setLoading(false);
        history.push(`/posts/viewuser/${params.id}`);
      });
  };

  //useEffect
  useEffect(() => {
    setLoading(true);
    fetchUserById();
  }, []);

  //routing to post
  const backToPost = () => {
    window.location.assign("/posts");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2%" }}>
      {loading && <Loader />}
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
            <b>Tourist Location:</b> {details.tourist_location}
          </li>
        </ul>
      }{" "}
      <div className="mt-5">
        <button className="btn btn-outline-info" onClick={() => backToPost()}>
          Back to posts
        </button>
      </div>
    </div>
  );
};

export default ViewUser;
