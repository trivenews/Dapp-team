import React, {Component} from "react";
import contract from 'truffle-contract';
import web3 from '../../web3';
import { withRouter } from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import ShowArticleInfo from "../showComponents/showArticleInfo";


class OpenNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleIds: [],
      articles: []
    }
    this.getTaskByState = this.getTaskByState.bind(this);
  }

  getTaskInfo(articleId) {
    this.props.trive.triveContract.tasks(articleId)
    .then((result) => {
    console.log(result)
    var articles = [...this.state.articles];
    articles.push(<ShowArticleInfo isResearcher={this.props.isResearcher} myContract={this.props.myContract} articleId={articleId} key={articleId} data={result} curAddr={this.props.curAddr}/>);

    this.setState({
      articles
    });
    }).catch((error) => {
      console.log(error)
    })
  }

  findArticleInfo(arr) {
    let res = [];
    arr.map(num => {
      res.push(parseInt(num.toString()))
    });
    this.setState({
      articleIds: res
    });

    res.forEach((num) => {
      this.getTaskInfo(num);
    });
  }

  getTaskByState() {
    this.props.trive.triveContract._getTasksByState(0, 0)
    .then((result) => {
      this.findArticleInfo(result);
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    if (this.props.trive.isloaded){this.getTaskByState()};
  }
  render() {

    return (
      <div>
        <h1>Open NEWS</h1>
        <hr />
        <div >
          {this.state.articles}
        </div>
      </div>
    )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpenNews));
