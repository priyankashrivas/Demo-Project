import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Alert, Button, Input } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { confirmAlert } from "react-confirm-alert";
import 'react-toastify/dist/ReactToastify.css';
import "react-confirm-alert/src/react-confirm-alert.css";



const PostList = (id) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  // const[input, setInput] = useState('');
  // const[output, setOutput] = useState([])
  const [query, setQuery] = useState("");
  
  // const [q, setQ] = useState("");
  // const [searchParam] = useState(["email", "name"]);
  // useEffect(() => {

  // }, []);


  const fetchData = async () => {
    await axios
      .get("http://restapi.adequateshop.com/api/Tourist")
      .then((res) => {
        const posts = res.data;
        setPosts(posts);
        console.log(posts.data);
      });
  };


  useEffect(() => {
    fetchData();
  }, []);
  
 
  const submit = (item) => {
    confirmAlert({
      title: "Warning",
      message: "Are you sure you want to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(item.id)
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });
  };


  const deleteUser = (id) => {
    fetch(`http://restapi.adequateshop.com/api/Tourist/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        if (resp) {
          const notify = toast.success('Deleted Successfully');
          setTimeout(function () {
            navigate('/PostList')
          }, 3000);


        }
        console.warn(resp);
        fetchData();
      });
    });
  };



  const Form = () => {
    navigate.pushState("/Form");
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 style={{ marginLeft: "" }} className="bolder text-lg">
          List
        </h2>
        <button><Link to="/Form">Create</Link> {" "}
        </button>

        <div className="ui icon input">
          <br></br>
          <form class="example" action="action_page.php">
            <input type="text"
             placeholder="Search.."
             name="search"
             onChange={(e) => setQuery(e.target.value)}
             />
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </div>

      <Container fluid className="page-container-section">
        <Row className="custom-row">
          <Col xxl={10} xl={9} lg={8} md={8}>
            <Row className="m-t30">
              <Col xxl={8} xl={9} lg={8} md={8}>
                <div className="table-scroll">
                  <Table className="custom-table">
                    {console.log("abcd", posts && posts.data)}
                    {posts.data && posts.data.length !== 0 ? (
                      <thead>
                        <tr>
                          <th width="300">Tourist id</th>
                          <th>Tourist Name</th>
                          <th>Tourist Email</th>
                          <th>Tourist Location</th>
                        </tr>
                      </thead>
                    ) : (
                      <div>
                        <br />
                        <Alert variant={"secondary"}>No Posts Found</Alert>
                      </div>
                    )}
                    <tbody>
                      {posts.data && 
                        posts.data.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td style={{ width: "18%" }}>{item.id}</td>
                              <td>{item.tourist_name}</td>
                              <td>{item.tourist_email}</td>
                              <td>{item.tourist_location}</td>

                              <td></td>
                              <td className="custom_view">
                                <td>
                                  < ToastContainer />
                                  <Button
                                    variant="success"
                                    size="sm"
                                    title="view"
                                    className="btn btn-dark"
                                    onClick={() => submit(item)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </td>
                              <td>
                                <Button
                                  variant="success"
                                  type="button"
                                  size="sm"
                                  title="view"
                                  className="btn btn-warning"
                                >
                                  <Link to={`/Edit/${item.id}`}>Edit</Link> {" "}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col xxl={4} xl={3} lg={4} md={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default PostList;