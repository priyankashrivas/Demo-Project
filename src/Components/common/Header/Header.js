import React from "react";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Dropdown,
  DropdownToggle,
} from "reactstrap";
import { isAuthenticated } from "../../selectors/AuthSelectors";
import { logoutAction } from "../../features/actions/AuthAction";
import Loader from "../loader/Loader";
import { toastr } from "react-redux-toastr";
import { MESSAGES } from "../../config/Constant";

const Header = (props) => {
  const auth = useSelector((state) => state.auth)
  console.log(auth.auth.email);
  const dispatch = useDispatch();
  const history = useHistory();

  //routing for on logout
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    window.location.assign("/login");
    toastr.success("success", MESSAGES.USER_LOGOUT, { autoClose: 3000 });
  };

  //routing for on post
  const onPost = (e) => {
    e.preventDefault();
    history.push("/posts");
  };
  return (
    <div>
      <div>
        {props.showLoading && <Loader />}
        <Navbar color="light" light expand="md">
          <NavbarBrand>Post Management</NavbarBrand>

          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              {!props.isAuthenticated && (
                <>
                  <NavItem>
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">Signup</NavLink>
                  </NavItem>
                </>
              )}

              {props.isAuthenticated && (
                <>
                   <NavItem>
                    <Button style={{ marginLeft: "2126%" }} onClick={onLogout}>
                      Logout
                    </Button>
                  </NavItem> 
                  <NavItem>
                    <NavLink href="/home" style={{ marginLeft: "-144%" }}>
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/posts" style={{ marginLeft: "-155%" }}>
                      Posts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" style={{ marginLeft: "745%" }}>
                     {auth.auth.email}
                    </NavLink>
                  </NavItem>
                 
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default connect(mapStateToProps)(Header);
