import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';

//Importing Libraries
import { Label, Input, Button } from "reactstrap";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import useValidator from '../Validator/Validator';
import Loader from '../Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';

export const EditUSer = () => {

    const navigate = useNavigate();
    let [selectedData, setData] = useState('')
    let initialValues = {
        tourist_name: '',
        tourist_email: '',
        tourist_location: ''
    };
    const [user, setUser] = useState(initialValues);
    const [validator, showValidationMessage] = useValidator();
    const [formValues, setFormValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    let params = useParams()

    //For Fetching Data
    const fetchData = async () => {
        // setLoading(true);
        await axios
            .get(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
            .then((res) => {
                setLoading(false);
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
        setLoading(true);
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
    
    //For Edit
    const handelSubmitEditUser = (event) => {
        event.preventDefault();
        EditUser();
    }
    
    //Edit Uder from api
    const EditUser = (id) => {
        // setLoading(true);
        if (validator.allValid()) {
            axios.put(`http://restapi.adequateshop.com/api/Tourist/${params.id}`, {
                id: params.id,
                tourist_name: user.tourist_name,
                tourist_email: user.tourist_email,
                tourist_location: user.tourist_location
            }).then((res) => {
                // setLoading(true);
                if (res) {
                    const notify = toast.success('Edited Successfully');
                    setTimeout(function () {
                        navigate('/PostList')
                    }, 5000);
                }
            }).catch(function (error) {
                console.log(error)
                if (error.response && error.response.data) {
                    toast.error(error.response.data.Message)
                }
            });
        } else {
            console.log("valid");
            showValidationMessage(true);
        }
    };

    return (

        <div>
            {loading && <Loader />}
            {console.log("valid", validator)}
            <h3>Edit User Here</h3>
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
                    {validator.message("tourist_name", user.tourist_name, "required", { className: "text-danger", })}
                </div>

                <div>
                    <Label for="tourist_email">Email</Label>
                    <Input
                        type="text"
                        name="tourist_email"
                        value={user.tourist_email}
                        onChange={changeHandler}
                    />
                    {validator.message("tourist_email", user.tourist_email, "required|email", { className: "text-danger", })}
                </div>

                <div>
                    <Label for="tourist_location">Location</Label>
                    <Input
                        type="text"
                        name="tourist_location"
                        value={user.tourist_location}
                        onChange={changeHandler}
                    />
                    {validator.message("tourist_location", user.tourist_location, "required", { className: "text-danger", })}
                </div>
                <br />

                <Button type="submit" className="btn btn-info">
                    Edit User
                </Button>
            </form>
        </div>
    );
}

export default EditUSer;