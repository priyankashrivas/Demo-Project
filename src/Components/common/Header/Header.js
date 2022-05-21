import React from "react";
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

  Button
} from "reactstrap";
import { isAuthenticated } from "../../selectors/AuthSelectors";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MESSAGES } from "../../config/Constant";
import { logoutAction } from "../../store/actions/AuthAction";
import { toastr } from "react-redux-toastr";


// import { useDispatch } from "react-redux";

// export default class Example extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false,
//     };
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen,
//     });
//   }
const Header = (props) => {
  const auth = useSelector((state) => state.auth)
  console.log(auth.auth.email);
  console.log(props.isAuthenticated );
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    window.location.assign("/login");
    toastr.success("success", MESSAGES.USER_LOGOUT, { autoClose: 3000 });
  };
  const onPost = (e) => {
    e.preventDefault();
    history.push("/posts");
  };

  return (
    <div>
      <Navbar color="light" light expand="wd" className="navbar bg-dark navbar-dark py-3" >
        <NavbarBrand>Post Management</NavbarBrand>
        {/* <NavbarToggler onClick={toggle} /> */}
        {/* <Collapse isOpen={this.state.isOpen} navbar> */}
        <Nav className="ml-auto" navbar>
          {!props.isAuthenticated && (
            <>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Signup</NavLink>
              </NavItem>
            </>
          )}
          {/* <NavItem>
              <NavLink href="/signup">SignUp</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="/login">Login</NavLink>
               </NavItem> */}
          {/* <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/posts">Post</NavLink>
              </NavItem> */}

          {/* <NavItem>
                <NavLink href='/signup' >Signup</NavLink>
              </NavItem> */}

          {/* <NavItem>
                <NavLink href='/logout' >Logout</NavLink>
              </NavItem> */}

          {props.isAuthenticated && (
            <>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/posts">Post</NavLink>
              </NavItem>
              <NavItem>
              <Button onClick={onLogout}>
                      Logout
                </Button>
                  </NavItem> 
              <NavItem>
                <NavLink href="#" >
                  {auth.auth.email}
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href='/logout' >Logout</NavLink>
              </NavItem> */}

            </>
          )}
        </Nav>
        {/* </Collapse> */}
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default connect(mapStateToProps)(Header);