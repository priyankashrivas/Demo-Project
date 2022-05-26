import React from 'react'
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
    
    const onLogout= ()=> {
        localStorage.removeItem("userDetails");
        navigate('/SignIn');
      }
     
  
    return (
        <>
            <Navbar style={{backgroundColor:'bisque'}} expand="md">
                <NavbarBrand>Tourist Management</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                           <NavLink href="SignIn">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="SignUp">Signup</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">PostList</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{marginLeft:'1300%'}} onClick={onLogout} href="#">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            </>
        
    );
}
  
export default NavBar;