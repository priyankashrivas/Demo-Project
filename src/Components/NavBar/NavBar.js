import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand
} from 'reactstrap';

function NavBar(props) {

    // Collapse isOpen State
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    //For Logout
    const onLogout = () => {
        localStorage.removeItem("userDetails");
        window.location.assign('/SignIn');
    }

    //For GetItem
    let token = JSON.parse(localStorage.getItem("userDetails"));
    let auth = token && token.data.idToken

    return (
        <>
            <Navbar style={{ backgroundColor: 'bisque' }} expand="md">
                <NavbarBrand>Tourist Management</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {!auth && <NavItem>
                            <NavLink href="/SignIn">Login</NavLink>
                        </NavItem>}
                        {!auth && <NavItem>
                            <NavLink href="/">Signup</NavLink>
                        </NavItem>}

                        {auth && <NavItem>
                            <NavLink href="/postlist">PostList</NavLink>
                        </NavItem>}

                        {auth && <NavItem>
                            <NavLink style={{ marginLeft: '1300%' }}
                                onClick={onLogout}
                                href="#">
                                Logout
                            </NavLink>
                        </NavItem>}

                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;