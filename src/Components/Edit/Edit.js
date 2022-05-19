
import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from "reactstrap";
import {  useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
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
        EditUser();
    }

    const EditUser = (id) =>{
         axios.put(`http://restapi.adequateshop.com/api/Tourist/${params.id}`,{
            id: params.id,
            tourist_name: user.tourist_name,
            tourist_email: user.tourist_email,
            tourist_location:user.tourist_location
        }).then((res) => {
           if(res){
            //    console.log('hello')
               const notify = toast.success('Edited Successfully');
               setTimeout(function() {
                navigate('/PostList')
               }, 5000);
               
            
            }
            
        }).catch(function (error) {
            console.log(error)
        })
        
    }

    // const pushData = async () => {
    //     await axios
    //         .push(`http://restapi.adequateshop.com/api/Tourist/${params.id}`)
    //         .then((res) => {
    //             const posts = res.data;
    //             setData(posts);
    //             let initialValues = {
    //                 tourist_name: posts && posts.tourist_name,
    //                 tourist_email: posts && posts.tourist_email,
    //                 tourist_location: posts && posts.tourist_location,
    //             };
    //             setUser(initialValues)
    //             console.log(posts.data);

    //         });
    // };
    // useEffect(() => {
    //     pushData();
    // }, []);







    return (
      
        <div><h3>Edit User Here</h3>
          < ToastContainer/>
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

export default EditUSer;