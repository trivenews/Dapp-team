import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../../web3';
import VotingContract from '../../../build/contracts/Voting.json';
import { Redirect, withRouter, Link } from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class WitnessArticle extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1>article with id {this.props.match.params.id}</h1>

      </div>
    )
  }
}

export default WitnessArticle;
