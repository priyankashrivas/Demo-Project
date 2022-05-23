import React from "react";

//importing hooks
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//importing libraries
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { toastr } from "react-redux-toastr";

//importing Components
import { isAuthenticated } from "../../selectors/AuthSelectors";
import { logoutAction } from "../../features/actions/AuthAction";
import Loader from "../loader/Loader";
import { MESSAGES } from "../../config/Constant";

const Header = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log(auth.auth.email);

  //routing for on logout
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    window.location.assign("/login");
    toastr.success("success", MESSAGES.USER_LOGOUT, { autoClose: 3000 });
  };

  return (
    <div>
      <div>
        {props.showLoading && <Loader />}
        <Navbar color="light" light expand="md">
          <NavbarBrand>Post Management</NavbarBrand>

          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              {/* if not logged in */}
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

              {/* if logged in */}
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
                    <NavLink href="#" style={{ marginLeft: "937%" }}>
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

//mapStateToProps for authentication
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default connect(mapStateToProps)(Header);
