import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Grid, Row, Col} from "react-bootstrap";



class Dashboard extends Component {
  render() {
    const greeting = "HI, CHnace < 3."
    return (
      <div>
      <div className="dashboard-div">
        <h1>{greeting}</h1>
      </div>
      <div>
        <Grid>

          <Row className="show-grid">

            <Col sm={2}>
              hi
              <br />
              hoi
              <br />
              doei
              <br />
            </Col>

            <Col sm={10}>
              heeeeeel veeeeeel  teeeeeeext
              <br />
              heeeeeel veeeeeel  teeeeeeext
              <br />
              heeeeeel veeeeeel  teeeeeeext
              <br />
            </Col>

          </Row>

        </Grid>
      </div>
      </div>
    )
  }
}

export default Dashboard;
