import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import contract from 'truffle-contract';
import web3 from './web3';
import VotingContract from '../build/contracts/Voting.json';

import Header from "./components/navbar";
import Footer from "./components/footer";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

import './App.css';

const TriveDapp = contract(VotingContract);
TriveDapp.setProvider(web3.currentProvider);


class App extends Component {
  constructor() {
    super()
    this.state = {
      curUserInfo: {
        isUser: false,
        name: "",
        address: "",
        reputation: "",
        articleCount: "",
        penaltyCount: "",
        readyTime: ""
      },
      noUserAddr: "",
      myContract: TriveDapp,
      isResearcher: false
    }
    this.checkIfUserIsResearcher = this.checkIfUserIsResearcher.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  checkIfUserIsResearcher() {
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {
      TriveDappInstance = instance;
      return TriveDappInstance.isResearcher(this.state.curUserInfo.address)
    }).then((result) => {
      this.setState({
        isResearcher: result
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  grepEthAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({curAddr: accounts[0]})
    // console.log(accounts[0]);

    // check if the account is a user
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {

      TriveDappInstance = instance;
      return TriveDappInstance.findUserInfo.call({from: accounts[0]})
    }).then((result) => {
      console.log("the result will come soon")
      console.log(result);
      this.setState({
        curUserInfo: {
          isUser: true,
          name: result[0],
          address: accounts[0],
          reputation: result[1].toString(),
          articleCount: result[2].toString(),
          penaltyCount: result[3].toString(),
          readyTime: result[4].toString()
        }
      })
      // TODO: I need to route from here
      // return TriveDappInstance.findUserInfo.call(account)
    }).then(() => {
      this.checkIfUserIsResearcher();
    }).catch((error) => {
      console.log(error);
      this.setState({noUserAddr: accounts[0]})
    })
  };
  reloadPage() {
    this.grepEthAccount();
  }

  componentDidMount() {
    this.grepEthAccount();
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
            /> )} />

          <Route exact path='/' component={(props) => (<LandingPage /> )} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
