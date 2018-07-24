import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Grid, Row, Col, Button, Form, FormGroup, ControlLabel, Checkbox, FormControl} from "react-bootstrap";



class Register extends Component {
  render () {
    const gridHeight = {
        height: "100vh"
      };
    return (
      <div>
      <div className="dashboard-div">
        <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" className="App-logo-d" alt="logo" />
      </div>
      <div>
        <Grid style={gridHeight}>
        <Row className="show-grid">
        <br/>
        <h1 className="text-center">Welcome to trive.news</h1>
        <h3 className="text-center">Please enter a username to get started</h3>
        <br/>
        <Col md={2}>
        
         </Col>
        <Col md={8} className="text-center">
        <Form inline>
            <FormGroup controlId="formInlineName">
                {' '}
                <FormControl type="text" placeholder="Username" />
            </FormGroup>{' '} {' '}
            <Button type="submit">Register</Button>
        </Form>
         </Col>
        <Col md={2}>
         
          </Col>
         </Row>

        </Grid>
      </div>
      </div>
    )
  }
}

export default Register;
