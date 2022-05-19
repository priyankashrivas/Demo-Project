import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Alert, Button } from "reactstrap";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  deleteUsersList,
  setSelectedData,
} from "../../features/actions/PostAction";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGES } from "../../config/Constant";

const Posts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.users);
  const selectedUser = user.posts;
  const params = useParams();
  
  const create = () => {
   window.location.assign("/createpost");
    
  };

  // fetching data
  const fetchData = async () => {
    await axios
      .get("http://restapi.adequateshop.com/api/Tourist")
      .then((res) => {
        const posts = res.data;
        setPosts(posts);
      });
  };

  useEffect(() => {
    fetchData();
    setLoading(true);
  }, []);

  //onDeletePost
  const deleteUser = (id) => {
    const toastrConfirmOptions = {
      onOk: () => {
        dispatch(
          deleteUsersList(id, (res) => {
            if (res.status === 200) {
              toastr.success("Success", MESSAGES.USER_DELETE_SUCCESS);
              fetchData();
            }
          })
        );
      },
      onCancel: () => console.log("CANCEL: clicked"),
    };

    toastr.confirm("Are you sure you want to delete?", toastrConfirmOptions);
  };

  

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 style={{ marginLeft: "47%" }} className="bolder text-lg">
          Posts
        </h2>
      </div>

      <div>
        <button
          className="btn btn-outline-secondary"
          style={{ marginLeft: "1%", marginBottom: "1%" }}
          onClick={() => create()}
        >
          Create +
        </button>
      </div>

      <Container fluid className="page-container-section">
        <Row className="custom-row">
          <Col xxl={10} xl={9} lg={8} md={8}>
            <Row className="m-t30">
              <Col xxl={8} xl={9} lg={8} md={8}>
                <div className="table-scroll">
                  <Table className="custom-table">
                    {posts.data && posts.data.length != 0 ? (
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
                                <Button
                                  variant="success"
                                  size="sm"
                                  title="view"
                                  className="btn btn-info"
                                >
                                  <div
                                  onClick={() => {
                                    history.push(`/posts/viewuser/${item.id}`)
                                  }}
                                  >
                                    View</div>
                                </Button>
                              </td>
                              <td>
                                <Button
                                  variant="success"
                                  size="sm"
                                  title="view"
                                  className="btn btn-danger"
                                  onClick={() => deleteUser(item.id)}
                                >
                                  Delete
                                </Button>
                              </td>

                              <td>
                                <Button
                                  variant="success"
                                  type="button"
                                  size="sm"
                                  title="view"
                                  className="btn btn-success"
                                >
                                  <div
                                    onClick={() => {
                                      dispatch(setSelectedData(item));

                                      history.push(
                                        `/posts/updatePost/${item.id}`
                                      );
                                    }}
                                  >
                                    Edit Details
                                  </div>
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

export default Posts;
