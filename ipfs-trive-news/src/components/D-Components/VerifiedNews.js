import React, {Component} from "react";
import contract from 'truffle-contract';
import web3 from '../../web3';

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalArticlesCount: ""
    }
    this.getTaskCount = this.getTaskCount.bind(this);
  }
  getTaskCount() {
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;

    // TODO: I should move getAccounts out of this function
    web3.eth.getAccounts((error, accounts) => {
      var account = accounts[0];
      TriveDapp.deployed().then((instance) => {
        TriveDappInstance = instance;
        return TriveDappInstance.getTotalTasksCount()
      }).then((result) => {
        console.log(result.c[0]);
        this.setState({totalArticlesCount: result.c[0]})
        // TODO: I need to route from here
        // return TriveDappInstance.findUserInfo.call(account)
      }).catch((error) => {
        console.log(error);
      })
    })
  }
  componentDidMount() {
    this.getTaskCount()
  }

  render() {
    return (
      <div>
        <h1>NEWS</h1><h3>total: {this.state.totalArticlesCount}</h3>
        <hr />
        <h3>No news yet.</h3>
      </div>
    )
  }
}

export default News;
