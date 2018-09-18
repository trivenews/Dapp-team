import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';

import contract from 'truffle-contract';
import web3 from './web3';
import VotingContract from '../build/contracts/Voting.json';
import CoinContract from '../build/contracts/TriveCoin.json';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {storeWeb3Account, instantiateTriveContract, currentUserInformation} from   './actions';

import Header from "./components/navbar";
import Footer from "./components/footer";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";


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
      currentProvider: getCurrentProvider,

    }
    // this.checkIfUserIsResearcher = this.checkIfUserIsResearcher.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    // this.setInstance = this.setInstance.bind(this);
  }


  //Done in redux
  // setInstance() {
  //   TriveDapp.deployed().then((instance) => {
  //     this.setState({
  //       triveDappInstance: instance
  //     })
  //   });
  //   TriveCoin.deployed().then((instance) => {
  //     this.setState({
  //       triveCoinInstance: instance
  //     })
  //   });
  // }

  // checkIfUserIsResearcher() {
  //   this.state.triveDappInstance.checkIfUserIsVerifier(this.state.curUserInfo.address)
  //   .then((result) => {
  //     this.setState({
  //       isResearcher: result
  //     })
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  checkbalance() {
    this.state.triveCoinInstance.balanceOf(this.state.noUserAddr || this.state.curUserInfo.addres, {from: this.state.noUserAddr || this.state.curUserInfo.addres})
    .then((result) => {
      console.log(this.state.noUserAddr, " has this much trive tokens: ", result)
    }).catch((error) => {
      console.log(error)
    })
  }
  // setEventTracker = () => {
  //   console.log('from app')
  //   const myEvent = this.props.contracts.triveContract.NewTask({},{fromBlock: 0, toBlock: 'latest'});
  //   myEvent.watch(function(error, result){
  //       console.log("on watch");
  //       console.log(arguments);
  //   });
  // }


  reloadPage() {
    this.props.currentUserInformation();
    this.props.instantiateTriveContract();
    this.props.storeWeb3Account();
  }

  componentDidMount() {
    this.props.currentUserInformation();
    this.props.instantiateTriveContract();
    this.props.storeWeb3Account();
  };

  componentWillMount(){

    // this.props.currentUserInformation();
    // this.props.instantiateTriveContract();
    // this.props.storeWeb3Account();
  }


  render() {
    // if (this.props.contracts.isloaded) {
    //   console.log(this.props.contracts.isloaded)
    //   this.setEventTracker();
    // }
    return (
      <div className="App">
        <Header
          myContract={this.state.myContract}
          curUserInfo={this.props.curUserInfo}
        />
        <Switch>

          <Route exact path='/dashboard/:sel/:id' component={(props) => (<Dashboard
            myContract={this.state.myContract}
            curAddr={this.state.curUserInfo.address}
            isResearcher={this.state.isResearcher}
           /> )} />

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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  instantiateTriveContract,
  storeWeb3Account,
  currentUserInformation,

}, dispatch);

const mapStateToProps = (state) => {
	return ({
    curUserInfo: state.currentUserInfo.curUserInfo,
    account: state.trive.account,
    contracts: state.trive.contracts,
  //activeAccount: state.web3.activeAccount
})
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
