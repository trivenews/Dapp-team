import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Grid, Row, Col, Button, ButtonGroup, DropdownButton, MenuItem} from "react-bootstrap";
import Verify from "./D-Components/SubmitArticle";
import News from "./D-Components/VerifiedNews";


class Dashboard extends Component {
  render() {
    const greeting = "HI, CHnace < 3."
    return (
      <div>
      <div className="dashboard-div">
        <h1>{greeting}</h1>
      </div>
      <div>
        <Grid className="dash-row">

          <Row className="show-grid">

            <Col sm={2}>
              <ButtonGroup vertical block>
                <Link to="/dashboard/news" ><Button>Verified News</Button></Link>
                <Link to="/dashboard/verify" ><Button>Submit Article</Button></Link>
                <DropdownButton title="News Status" id="bg-vertical-dropdown-1">
                  <Link to="" ><MenuItem eventKey="1">Open</MenuItem></Link>
                  <Link to="" ><MenuItem eventKey="2">Verify</MenuItem></Link>
                  <Link to="" ><MenuItem eventKey="3">Witness</MenuItem></Link>
                  <Link to="" ><MenuItem eventKey="4">Expired</MenuItem></Link>
                  <Link to="" ><MenuItem eventKey="5">Cancelled</MenuItem></Link>
                </DropdownButton>

              </ButtonGroup>
            </Col>

            <Col sm={10} className="dash-content">

              <Switch>
                <Route exact path="/dashboard/verify" render={(props) => (<Verify />)} />

                <Route exact path="/dashboard/news" render={(props) => (<News />)} />

                <Route exact path="/dashboard/" render={(props) => (<News />)} />

              </Switch>
            </Col>

          </Row>

        </Grid>
      </div>
      </div>
    )
  }
}

export default Dashboard;
