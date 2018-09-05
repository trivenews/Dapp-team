import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import {Grid, Row, Col, Button, Form, FormGroup, ControlLabel, Checkbox, FormControl, Table} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../web3';
import VotingContract from '../../build/contracts/Voting.json';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';


import ShowArticleInfo from "./showComponents/showArticleInfo";
// import VotingContract from '../../build/contracts/Voting.json';
//
// const TriveDapp = contract(VotingContract);
// TriveDapp.setProvider(web3.currentProvider);
// TODO: testing if I can give these vars as props
// TODO: button will call function on contract artifacts

const TriveDapp = contract(VotingContract);
TriveDapp.setProvider(web3.currentProvider);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      articleIds: [],
      articles: [],
      triveBalance: ''
    };
    // this.getTaskByOwner = this.getTaskByOwner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkBalance = this.checkBalance.bind(this);

    // this.getTaskInfo = this.getTaskInfo.bind(this);
    // this.becomeResearcher = this.becomeResearcher.bind(this);
  }
  handleChange(e) {
    this.setState({ username: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.trive.triveContract.createUser(this.state.username, {from: this.props.account, gas: 6654755})
    .then((result) => {
      this.props.reloadFunc()
    })
    this.props.history.push('/dashboard/news');
  }
  // findArticleInfo(arr) {
  //   console.log(arr);
  //   let res = [];
  //   arr.map(num => {
  //     res.push(parseInt(num.toString()))
  //   });
  //   console.log(res);
  //   this.setState({
  //     articleIds: res
  //   });
  //
  //   res.forEach((num) => {
  //     this.getTaskInfo(num);
  //   });
  // }

  // getTaskInfo(articleId) {
  //   this.props.triveDappInstance._getTaskInfo(articleId)
  //   .then((result) => {
  //     console.log(result)
  //     var articles = [...this.state.articles];
  //     articles.push(<ShowArticleInfo key={articleId} data={result} curAddr={this.props.curUserInfo.address}/>);
  //
  //     this.setState({
  //       articles
  //     });
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  // getTaskByOwner() {
  //   this.props.triveDappInstance._getTasksByOwner(this.props.noUserAddr || this.props.curUserInfo.address)
  //   .then((result) => {
  //     this.findArticleInfo(result);
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }
  //become researcher function
  // becomeResearcher(e) {
  //   e.preventDefault();
  //   this.props.triveDappInstance.createResearcher({from: this.props.curUserInfo.address})
  //   .then((result) => {
  //     console.log(result)
  //     this.props.reloadFunc()
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  checkBalance() {
    this.props.trive.coinContract.balanceOf(this.props.account, {from: this.props.account, gas: 6654755})
   .then((result) => {
     console.log(result)
     let results = result.c[0].toString();
     let len = results.length;
     let res = results.substring(0, len-4) + "." + results.substring(len-4);
     this.setState({triveBalance: res})
   }).catch((error) => {
     console.log(error);
   })

  }


  componentDidMount() {
    // this.getTaskByOwner()
    if (this.props.trive.isloaded){this.checkBalance()};
  }

  render () {

    const gridHeight = {
      'min-height': "100vh",
      'heigt': "auto",
      "min-width": "100%"
    };

    const { isUser, name, address, reputation, rank, readyTime} = this.props.curUserInfo;
    const { username, articles, articleIds } = this.state;
    const checkForResearcher = (<Button bsStyle="warning" onClick={this.becomeResearcher}>Become A Researcher!</Button>);

    const registerForm = (
      <Form inline>
        <FormGroup controlId="formInlineName">
        {' '}
        <br/>
        <h1 className="text-center">Welcome to trive.news</h1>
        <h3 className="text-center">Current ethereum addres: {this.props.noUserAddr}</h3>
        <h3 className="text-center">Please enter a username to get started</h3>
        <FormControl
          type="text"
          value={username}
          placeholder="Enter text"
          onChange={this.handleChange}
        />
        </FormGroup>
        <br />
        <br />
        <Button bsStyle="primary" onClick={this.handleSubmit}>Register</Button>
      </Form>
    );

    const userInfo = (
      <div>
        <h1>{name}'s info {!this.props.isResearcher && checkForResearcher}</h1>
        <Table bordered responsive>

          <tbody>
            <tr>
              <th>My address</th>
              <th>{address}</th>
            </tr>
            <tr>
              <td>Reputation</td>
              <td>{reputation}</td>
            </tr>
            <tr>
              <td>Rank</td>
              <td>{rank}</td>
            </tr>
            <tr>
              <td>TRV Balance</td>
              <td>{this.state.triveBalance}</td>
            </tr>



            <tr>
              <td>Ready time</td>
              <td>{new Date(readyTime * 1000).toString()}</td>
            </tr>
          </tbody>
      </Table>
      </div>
    );


    return (
      <div>
        <div className="dashboard-div">
          <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" className="App-logo-d" alt="logo" />
        </div>
        <div>
          <Grid style={gridHeight}>
          <Row className="show-grid">
          <Col md={2}>
          </Col>
          <Col md={8} className="text-center">

            {!isUser && registerForm}
            {isUser && userInfo}

          </Col>
          <Col md={2}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={12} className="text-center">
              {articles}
            </Col>
          </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

  // instantiateTriveContract,
  // storeWeb3Account,
  // currentUserInformation
}, dispatch);

const mapStateToProps = (state) => {
	return ({
    curUserInfo: state.currentUserInfo.curUserInfo,
    account: state.trive.account,
    trive: state.trive.contracts
  //activeAccount: state.web3.activeAccount
})
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
// export default Register;
