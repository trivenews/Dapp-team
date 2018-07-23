import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {Table, NavDropdown, MenuItem, Navbar, NavItem, Nav, Grid, Button, Form } from 'react-bootstrap';


class Header extends Component {


  render() {

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
                <Link to="/dashboard" >Dashboard</Link>
              </NavItem>
              <NavItem eventKey={2} href="#">
                  <NavDropdown eventKey={3} title="Info" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Presentation</MenuItem>
                    <MenuItem eventKey={3.2}>Team</MenuItem>
                    <MenuItem eventKey={3.3}>Blog</MenuItem>
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
