import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {Table, NavDropdown, MenuItem, Navbar, NavItem, Nav, Grid, Button, Form } from 'react-bootstrap';


class Header extends Component {


  render() {

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">TRIVE-News</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Dashboard
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
