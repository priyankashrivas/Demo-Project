import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';

export const ViewUSer = () => {
    const params = useParams();
    const [details, setDetails] = useState([]);

    const fetchUserById = async (id) => {
        await axios.get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
            .then((res) => {
                const details = res.data;
                console.log("hello", details);
                setDetails(details);

                Navigate(`/postList/view/${params.id}`);

            });
    };

    useEffect(() => {
        fetchUserById();
    }, []);

    const goBack = () => {
        window.location.assign('/PostList')
    }

    return (
        <div style={{ textAlign: "center", marginTop: "2%" }}>
            <h3>Tourist Details of: {details.id}</h3>
            {
                <table>
                    <tbody>
                        <tbody style={{ listStyleType: "none" }}>
                            <tr>
                                <td>Tourist Name: {details.tourist_name}</td>
                                <td>Tourist Email: {details.tourist_email}</td>
                               <td>Tourist Location: {details.tourist_location}</td>
                            </tr>
                        </tbody>
                    </tbody>
                </table>
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