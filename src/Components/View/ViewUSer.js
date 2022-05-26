import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import './ViewUSer.css';

export const ViewUSer = () => {
    const params = useParams();
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserById = async (id) => {
      setLoading(true);
        await axios.get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
            .then((res) => {
                const details = res.data;
                console.log("hello", details);
                setDetails(details);
                setLoading(false);
                Navigate(`/postList/view/${params.id}`);

            });
    };

    useEffect(() => {
      setLoading(true);
        fetchUserById();
    }, []);

    const goBack = () => {
        window.location.assign('/PostList')
    }

    return (
        <div style={{ textAlign: "center", marginTop: "2%"  }}>
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
            <b>Tourist Location</b> {details.tourist_location}
          </li>
        </ul>
            }{" "}
            <div className="mt-5">
                <button
                    className="btn btn-outline-info"
                    onClick={() => goBack()}
                >
                    Back
                </button>
            </div>
        </div>
    );
};
export default ViewUSer;