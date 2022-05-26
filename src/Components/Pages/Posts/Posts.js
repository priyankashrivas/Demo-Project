import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Alert, Button, DropdownItem,DropdownToggle,DropdownMenu,ButtonDropdown } from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteUserList,setSelectedData } from "../../store/actions/PostAction";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import './Post.css'


const Posts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.users);
  // const selectedUser = user.posts;

  //searching
    const [dropdownOpen, setOpen] = useState(false);
    const [searchName, setSearchName] = useState("");
    
    //pagination
    const[pageCount,setPageCount]=useState(1);
    const [currentPage,setcurrentPage]=useState(1);


  // fetching data

  const fetchData = async (page) => {
    await axios.get(`http://restapi.adequateshop.com/api/Tourist?page=${page}`).then((res) => {
      const posts = res.data;
      setPosts(posts);
      console.log(posts.data);
      console.log(res.data.total_pages);
      setPageCount(res.data.total_pages);

    });
  };

  useEffect(() => {
    fetchData();

  }, []);

    //for pagination
    const handlePageChange = (selectedObject) => {
      setcurrentPage(selectedObject.selected);
      console.log("page", selectedObject);
      fetchData(selectedObject.selected);
    };
  // delete by id
  const deleteUser = (id) => {
    fetch(`http://restapi.adequateshop.com/api/Tourist/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        fetchData();
        console.log(fetchData)
      });
    });
  };
  const viewuser = (id) => {
    fetch(`http://restapi.adequateshop.com/api/Tourist/${id}`).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        fetchData();
        console.log(fetchData)
        history.push("/viewuser");
      });
    });
  };
const submit=(item)=>{
confirmAlert({
  title:"Warning Alert",
  message:"Are you sure you want to delete..?",
  buttons:[
    {
      label:"Yes",
      onClick:()=>deleteUser(item.id)
    },
    {
      label:"No"
    }
  ]
});
};
  const createPost = () => {
    history.push("/cpost");
  };
  const EditPost = (item) => {
    console.log('item', item)
    history.push("/editpost");
  };

  //for sorting by ascending order
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

  //for sorting by sescending order
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
      <div className="flex items-center justify-between my-4">
        <h2 style={{ marginLeft: "47%" }} className="bolder text-lg">
          Posts
        </h2>

        <createPost />
        <button
          type="submit"
          className="px-2 py-1 bg-info text-black"
          onClick={createPost}
        >
          + Create Post
        </button>
    
        {/* //sorting dropdown */}
        <ButtonDropdown
          toggle={() => {
            setOpen(!dropdownOpen);
          }}
          isOpen={dropdownOpen}
        >
          <DropdownToggle
            style={{ marginLeft: "50%", marginTop: "-7%" ,borderColor:"black"}}
            className="px-2 py-1 bg-info text-black"
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
    
      {/* /*searching */ }
       <div className="form-outline mb-4">
        <input
          style={{ width: "55%", marginLeft: "1%" }}
          type="search"
          className="form-control"
          id="datatable-search-input"
          placeholder="Search..!!"
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
                        posts.data
                        .filter((item)=>{
                          if(searchName==""){
                            return item;
                          }
                          else if(
                            item.tourist_name.toLowerCase()
                            .includes(searchName.toLowerCase())
                          )
                          {
                            return item;
                          }
                          
                        }).map((item) => {
                          return (
                            <tr key={item.id}>
                              <td style={{ width: "18%" }}>{item.id}</td>
                              <td>{item.tourist_name}</td>
                              <td>{item.tourist_email}</td>
                              <td>{item.tourist_location}</td>

                              <td></td>
                              <td className="custom_view">
                                <a
                                  href={
                                    item.tourist_profilepicture
                                      ? item.tourist_profilepicture
                                      : " "
                                  }
                                  // target={"_blank"}
                                >
                                  <Button
                                    variant="success"
                                    type="button"
                                    size="sm"
                                    title="view"
                                    className="btn btn-info"
                                    onClick={(e) => {
                                      history.push(`/posts/viewuser/${item.id}`)
                                       e.preventDefault();

                                    }}
                                  >
                                    View
                                  </Button>
                                </a>
                              </td>
                              <td>
                                <Button
                                  variant="success"
                                  size="sm"
                                  title="view"
                                  className="btn btn-danger"
                                  onClick={() => submit(item.id)}

                                >
                                  Delete
                                </Button>
                              </td>

                              <td>

                                {/* <Link
                        to={`/editPost/${item.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link> */}

                                <Button
                                  variant="success"
                                  type="button"
                                  size="sm"
                                  title="view"
                                  className="btn btn-success"
                                  // onClick={() => EditPost(item)}
                                  // onClick={() => {
                                  //   dispatch(selectedUpdateUser(item))
                                  //   history.push(`/editPost/${item.id}`)

                                  //      }}
                                  onClick={() => {
                                    history.push(`/posts/editPost/${item.id}`)

                                  }}
                                >

                                  Edit
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
                    disabledClassName={"disabled"}
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
