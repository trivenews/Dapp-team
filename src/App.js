import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';

// import contract from 'truffle-contract';
import Web3 from './web3';
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
// import { throws } from 'assert';


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
      triveDappInstance: '',
      triveCoinInstance: '',
      isResearcher: false,
      currentProvider: getCurrentProvider,
      network: ''

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
    // this.props.currentUserInformation();
    // this.props.instantiateTriveContract();
    // this.props.storeWeb3Account();

  };
  checkWeb3 = async () => {
    let soort = await Web3.eth.net.getId();
    this.setState({network: soort})
    console.log(soort)
  }

  componentWillMount(){

    // this.props.currentUserInformation();
    this.props.instantiateTriveContract();
    this.props.storeWeb3Account();
    
  }


  render() {
    if (this.props.contracts.isloaded && !this.props.curUserInfo.isUser) {
      this.props.currentUserInformation();
    }
    if (this.props.contracts.isloaded && this.state.network !== 3) {
      this.checkWeb3();
    }
    var divStyle = {
      marginTop: '5em',
      color: "red"
    };
    const changeNetwork = (<div style={divStyle}>
      <h1>Please change to ropsten network to use this app.</h1>
    </div>)
    return (

      <div className="App">
        
        <Header
          myContract={this.state.myContract}
          curUserInfo={this.props.curUserInfo}
        />
        {this.state.network !== 3 && changeNetwork}
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
