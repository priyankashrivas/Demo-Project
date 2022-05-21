import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Alert, Button } from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedUpdateUser } from "../../store/actions/PostAction";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Posts = ({ placeholder, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [flag, setflag] = useState(false);
  const [allData, setAllData] = useState([]);
  // const [filteredData,setFilteredData] = useState(allData);
  // const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");


  // fetching data

  const fetchData = async () => {
    await axios.get("http://restapi.adequateshop.com/api/Tourist").then((res) => {
      const posts = res.data;
      setPosts(posts);
      console.log(posts.data);

    });
  };

  useEffect(() => {
    fetchData();

  }, []);

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
  const viewUser = (id) => {
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
  // const editPost = (item) => {
  //   console.log('item',item)
  //   setflag(true)
  //   history.push({
  //     pathname: `update/${item.id}`,
  //     state: { selectedPost: item }
  //   })
  // };
  // const editPost = async (item) => {
  //   history.push('/editPost')
  // };
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = searchWord.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
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
          className="px-2 py-1 bg-info text-white"
          onClick={createPost}
        >
          + Create Post
        </button>
      </div>
      <input icon='search'
        placeholder='Search...'
        value={""}
      // onChange={(e) => searchItems(e.target.value)}

      />

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
                                <a
                                  href={
                                    item.tourist_profilepicture
                                      ? item.tourist_profilepicture
                                      : " "
                                  }
                                  target={"_blank"}
                                >
                                  <Button
                                    variant="success"
                                    type="button"
                                    size="sm"
                                    title="view"
                                    className="btn btn-info"
                                    onClick={() => {
                                      history.push(`/posts/viewuser/${item.id}`)

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
                </div>
              </Col>
              <Col xxl={4} xl={3} lg={4} md={4}></Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />

        </div>

      </div>
    </div>

  );
};

export default Posts;
