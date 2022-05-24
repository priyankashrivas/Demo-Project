import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Import Libraries
import { Container, Row, Col, Table, Alert, Button, Toggle, DropdownMenu, ButtonDropdown, DropdownToggle, DropdownItem } from "reactstrap";
import { toast } from 'react-toastify';
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate from "react-paginate";
import './PostList.css';

const PostList = (id) => {
  const params = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  
  // Searching
  const [searchName, setSearchName] = useState('');
  const [dropdownOpen, setOpen] = useState(false);

  //Pagination
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);
  const [isLoaded, setisLoaded] = useState(false);

  //Fetching Data from api with pagination
  const fetchData = async (page) => {
    await axios
      .get(`http://restapi.adequateshop.com/api/Tourist?page=${page}`)
      .then((res) => {
        const posts = res.data;
        setPosts(posts);
        console.log(posts.data);
        setPageCount(posts.total_pages);
        setisLoaded(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //For Pagination
  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    fetchData(selectedObject.selected);
    console.log("hello", selectedObject);
  };

 //Delete
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
        }
      ]
    });
  };

   //Delete UserId via api
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

  //Sorting by a to z
  const sortAscending = () => {
    posts.data.sort((a, b) => {
      let fa = a.tourist_name.toLowerCase(),
      fb = b.tourist_name.toLowerCase();
      if(fa < fb) {
        return -1;
        console.log("post", posts);
      }
      return 0;
    });
  };
  //Sorting by z to a
  const sortDecending = () => {
    posts.data.sort((a,b) => {
      let fa = a.tourist_name.toUpperCase(),
      fb = b.tourist_name.toUpperCase();
      if (fa > fb) {
        return -1;
        console.log("post",posts);
      }
      return 0;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 style={{ marginLeft: "" }} className="bolder text-lg">
          List
        </h2>
        <button><Link to="/Form">Create</Link> {" "}
        </button>

          {/* Sorting Button */}
        <ButtonDropdown toggle={() => { setOpen(!dropdownOpen) }}
          isOpen={dropdownOpen}>
          <DropdownToggle style={{ marginLeft: '10%', marginTop: '-%' }} className="bg-info" caret >
            Sort Data
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Alphabetically
            </DropdownItem>
            <DropdownItem value='atoz' onClick={sortAscending}>a-z</DropdownItem>
            <DropdownItem value='ztoa' onClick={sortDecending}>z-a</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>

         {/* Searching  */}
        <div className="form-outline mb-4">
          <input
            style={{ width: '30%', marginLeft: '15%' }}
            type='search'
            className="form-control"
            id="datatable-search-input"
            placeholder="Search...."
            onChange={(e) => setSearchName(e.target.value)}
          />
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
                    {/* Filtered and map */}
                    <tbody>
                      {posts.data &&
                        posts.data.filter((item) => {
                          if (searchName == "") {
                            return item
                          }
                          else if (item.tourist_name.toLowerCase().includes(searchName.toLowerCase())) {
                            return item
                          }
                        }).map((item) => {
                          return (
                            <tr key={item.id}>
                              <td style={{ width: "18%" }}>{item.id}</td>
                              <td>{item.tourist_name}</td>
                              <td>{item.tourist_email}</td>
                              <td>{item.tourist_location}</td>

                              <td>
                                <td className="custom_view">
                                  <Button
                                    variant="success"
                                    size="sm"
                                    title="view"
                                    className="=" btn btn-info
                                  >
                                    <div
                                      onClick={() => {
                                        navigate(
                                          `/postList/view/${item.id}`
                                        );
                                      }}
                                    >View
                                    </div></Button>
                                </td>
                                <td>

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

                  {/* For Pagination */}
                  {isLoaded ? (
                    <ReactPaginate
                      pageCount={pageCount}
                      pageRange={2}
                      marginPageDisplayed={2}
                      onPageChange={handlePageChange}
                      containerClassName={'container'}
                      previousLinkClassName={'page'}
                      breakClassName={'page'}
                      nextLinkClassName={'page'}
                      pageClassName={'page'}
                      disabledClassName={'disabled'}
                      activeClassName={'active'}
                    />
                  ) : (
                    <div>Nothing to display</div>
                  )}
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