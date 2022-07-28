import React, { useState } from "react";
import { useDocTitle } from '../../utils/customHooks.js'
import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
import classnames from "classnames";
import logo from "../../assets/images/logo.png";
// reactstrap components
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,

} from "reactstrap";
// core components
import './nav.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let location = useLocation();
  const [doctitle, setDocTitle] = useDocTitle("ABC Nanny Club");
  function showAuthNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <NavItem>
            <NavLink
              className={location.pathname === '/me' ? 'active' : ''}
              onClick={() => setDocTitle("ABC Nanny Club :: Profile")}
            ><Link to='/me'>Profile</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={location.pathname === '/saved' ? 'active' : ''}
              onClick={() => setDocTitle("ABC Nanny Club :: Saved Babysitters")}
            ><Link to='/saved'>Saved Babysitters</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            href="/"
            onClick={() => Auth.logout()}
            >Logout
            </NavLink>
          </NavItem>

        </>
      );
    } else {
      return (
        <>
          <NavItem>
            <NavLink
              href="/register"
              className={location.pathname === '/register' ? 'active' : ''}
              onClick={() => setDocTitle("ABC Nanny Club :: Signup")}
            ><Link to='/register'>Register</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={location.pathname === '/login' ? 'active' : ''}
              onClick={() => setDocTitle("ABC Nanny Club :: Login")}
            ><Link to='/login'>Login</Link>
            </NavLink>
          </NavItem>
        </>
      );
    }
  }
  return (
    <Container>
      <Navbar expand="md" color="faded" light>
        <NavbarBrand href="/">
          <img src={logo} style={{ width: '300px' }}/>
          
          </NavbarBrand>  
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                className={location.pathname === '/home' ? 'active' : ''}
                onClick={() => setDocTitle("ABC Nanny Club :: Home")}
              ><Link to='/home'>Home</Link>
              </NavLink>
            </NavItem>
            {showAuthNavigation()}
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigation;
