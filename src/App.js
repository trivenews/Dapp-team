import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import contract from 'truffle-contract';
import web3 from './web3';
import VotingContract from '../build/contracts/Voting.json';
import CoinContract from '../build/contracts/TokenInterface.json';
import { connect } from 'react-redux'

import Header from "./components/navbar";
import Footer from "./components/footer";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";


import {web3connect, instantiateTriveContract} from   './actions';
import getCurrentProvider from './util/getCurrentProvider'

import './App.css';
import { throws } from 'assert';
  
const TriveDapp = contract(VotingContract);
TriveDapp.setProvider(web3.currentProvider);
const TriveCoin = contract(CoinContract);
TriveCoin.setProvider(web3.currentProvider);

class App extends Component {
  constructor() {
    super()
    this.state = {
      curUserInfo: {
        isUser: false,
        name: "",
        address: "",
        reputation: "",
        readyTime: "",
        rank: ""
      },
      noUserAddr: "",
      myContract: TriveDapp,
      triveDappInstance: '',
      triveCoinInstance: '',
      isResearcher: false,
      currentProvider: getCurrentProvider
    }
    this.checkIfUserIsResearcher = this.checkIfUserIsResearcher.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.checkbalance = this. checkbalance.bind(this);
    this.setInstance = this.setInstance.bind(this);
  }
  
 

  setInstance() {
    TriveDapp.deployed().then((instance) => {
      this.setState({
        triveDappInstance: instance
      })
    });
    TriveCoin.deployed().then((instance) => {
      this.setState({
        triveCoinInstance: instance
      })
    });
  }

  checkIfUserIsResearcher() {
    this.state.triveDappInstance.checkIfUserIsVerifier(this.state.curUserInfo.address)
    .then((result) => {
      this.setState({
        isResearcher: result
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  checkbalance() {
    this.state.triveCoinInstance.balanceOf(this.state.noUserAddr || this.state.curUserInfo.addres, {from: this.state.noUserAddr || this.state.curUserInfo.addres})
    .then((result) => {
      console.log(this.state.noUserAddr, " has this much trive tokens: ", result)
    }).catch((error) => {
      console.log(error)
    })
  }
  grepEthAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({noUserAddr: accounts[0]})
    // check if the account is a user
    this.state.triveDappInstance.findUserInfo.call({from: accounts[0]})
    .then((result) => {

      this.setState({
        curUserInfo: {
          isUser: true,
          name: result[0],
          address: accounts[0],
          reputation: result[1].toString(),
          readyTime: result[2].toString(),
          rank: result[3].toString()
        }
      })
      // TODO: I need to route from here
      // return TriveDappInstance.findUserInfo.call(account)
    }).then(() => {
      this.checkbalance();
      this.checkIfUserIsResearcher();
    }).then(() => {

    })
    .catch((error) => {
      console.log(error);
      this.setState({noUserAddr: accounts[0]})
    })
  };

  reloadPage() {
    this.grepEthAccount();
  }

  componentDidMount() {
    this.setInstance();
    this.grepEthAccount();
    this.props.instantiateTriveContract()
  };

 
  render() {

    return (
      <div className="App">
        <Header
          myContract={this.state.myContract}
          curUserInfo={this.state.curUserInfo}
        />
        <Switch>

          <Route exact path='/dashboard/:sel' component={(props) => (<Dashboard
            myContract={this.state.myContract}
            curAddr={this.state.curUserInfo.address}
            isResearcher={this.state.isResearcher}
           /> )} />

          <Route exact path='/dashboard' component={(props) => (<Dashboard
            myContract={this.state.myContract}
           /> )} />

          <Route exact path='/register' component={(props) => (
            <Register
              curUserInfo={this.state.curUserInfo}
              myContract={this.state.myContract}
              noUserAddr={this.state.noUserAddr}
              isResearcher={this.state.isResearcher}
              reloadFunc={() => {this.reloadPage()}}
              triveDappInstance={this.state.triveDappInstance}
              triveCoinInstance={this.state.triveCoinInstance}
            /> )} />

          <Route exact path='/' component={(props) => (<LandingPage /> )} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  instantiateTriveContract,
};

const mapStateToProps = (state) => {
	console.log(state)
	return ({
  web3: state.web3,
  trive: state.trive,
})};


export default connect(mapStateToProps, mapDispatchToProps)(App);

