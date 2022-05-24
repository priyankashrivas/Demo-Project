//importing hooks
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//importing libraries
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Alert,
  Button,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
} from "reactstrap";
import { toastr } from "react-redux-toastr";
import ReactPaginate from "react-paginate";

//importing Components
import {
  deleteUsersList,
  setSelectedData,
} from "../../features/actions/PostAction";
import { MESSAGES } from "../../config/Constant";

//importing css
import "./posts.css";
import Loader from "../../common/loader/Loader";

const Posts = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //for pagination
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);

  //for searching
  const [dropdownOpen, setOpen] = useState(false);
  const [searchName, setSearchName] = useState("");

  //for fetching data
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.users);
  const selectedUser = user.posts;

  //for loading
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  //routing
  const create = () => {
    window.location.assign("/createpost");
  };

  // fetching data along with pagination
  const fetchData = async (page) => {
    setLoading(true);
    await axios
      .get(`http://restapi.adequateshop.com/api/Tourist?page=${page}`)
      .then((res) => {
        const posts = res.data;
        setPosts(posts);
        setLoading(false);
        console.log("posts", posts);
        console.log(res.data.total_pages);
        setPageCount(res.data.total_pages);
      });
  };

  //useEffect
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  //for pagination
  const handlePageChange = (selectedObject) => {
    setLoading(true)
    setcurrentPage(selectedObject.selected);
    console.log("page", selectedObject);
    setLoading(false)
    fetchData(selectedObject.selected);
  };

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

  //for sorting by ASC
  const sortAscending = () => {
    posts.data.sort((a, b) => {
      let fa = a.tourist_name.toLowerCase(),
        fb = b.tourist_name.toLowerCase();

      if (fa < fb) {
        return -1;
        console.log("post", posts);
      }

      return 0;
    });
  };

  //for sorting by DSC
  const sortDescending = () => {
    posts.data.sort((a, b) => {
      let fa = a.tourist_name.toUpperCase(),
        fb = b.tourist_name.toUpperCase();

      if (fa > fb) {
        return -1;
        console.log("post", posts);
      }
      return 0;
    });
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="flex items-center justify-between my-4">
        <h2 style={{ marginLeft: "47%" }} className="bolder text-lg">
          Tourist Information
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

        {/* sorting dropdown */}
        <ButtonDropdown
          toggle={() => {
            setOpen(!dropdownOpen);
          }}
          isOpen={dropdownOpen}
        >
          <DropdownToggle
            style={{ marginLeft: "10%", marginTop: "-16%" }}
            className="bg-primary"
            caret
          >
            Sort Data By:
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Alphabetically</DropdownItem>
            <DropdownItem value="atoz" onClick={sortAscending}>
              a-z
            </DropdownItem>
            <DropdownItem value="ztoa" onClick={sortDescending}>
              z-a
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>

      {/* search bar */}
      <div className="form-outline mb-4">
        <input
          style={{ width: "55%", marginLeft: "1%" }}
          type="search"
          className="form-control"
          id="datatable-search-input"
          placeholder="Search...."
          onChange={(e) => setSearchName(e.target.value)}
        />
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
                    {/* filtering and mapping */}
                    <tbody>
                      {posts.data &&
                        posts.data
                          .filter((item) => {
                            if (searchName == "") {
                              return item;
                            } else if (
                              item.tourist_name
                                .toLowerCase()
                                .includes(searchName.toLowerCase())
                            ) {
                              return item;
                            }
                          })
                          .map((item) => {
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
                                        history.push(
                                          `/posts/viewuser/${item.id}`
                                        );
                                      }}
                                    >
                                      View
                                    </div>
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
                                      Update
                                    </div>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </Table>
                  {/* react pagination  */}
                  <ReactPaginate
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={"container"}
                    previousLinkClassName={"page"}
                    breakClassName={"page"}
                    nextLinkClassName={"page"}
                    pageClassName={"page"}
                    disabledClassNae={"disabled"}
                    activeClassName={"active"}
                  />
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
