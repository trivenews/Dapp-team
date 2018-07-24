import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {Table, NavDropdown, MenuItem, Navbar, NavItem, Nav, Grid, Button, Form } from 'react-bootstrap';


class Header extends Component {


  render() {
    const signUpStyle = {
      color: '#F25E02',
      fontWeight: 'bold'
    };
    return (
      <div className="nav-div">
        <Navbar fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img src="https://trive.news/wp-content/uploads/2018/01/trive-logo-web.png" className="App-logo" alt="logo" /></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight>
            <NavItem eventKey={1} href="#">
                <Link to="/register" style={signUpStyle}>Sign Up</Link>
              </NavItem>
              <NavItem eventKey={2} href="#">
                <Link to="/dashboard" >Dashboard</Link>
              </NavItem>
              <NavItem eventKey={3} href="#">
                  <NavDropdown eventKey={4} title="Info" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1}>Presentation</MenuItem>
                    <MenuItem eventKey={4.2}>Team</MenuItem>
                    <MenuItem eventKey={4.3}>Blog</MenuItem>
                  </NavDropdown>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

}

export default Header;
