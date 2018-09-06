import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../../web3';
import VotingContract from '../../../build/contracts/Voting.json';
import { Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class ShowArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: ""
      },
      isresearcher: false,
      redirect: false
    }
    this.fetchIPFS = this.fetchIPFS.bind(this);
    this.researchArticle = this.researchArticle.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }
  fetchIPFS() {
    fetch(`https://gateway.ipfs.io/ipfs/${this.props.data[0]}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();

      })
      .then(data => {
        this.setState({
          myData: {
            desc: data.myData.description,
            title: data.myData.title,
            url: data.myData.url
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };
  
  researchArticle(e) {
    e.preventDefault();
    this.props.trive.triveContract._acceptTask(this.props.articleId, {from: this.props.account})
    .then((result) => {
      console.log(result)
      this.setState({
        redirect: true
      })

    }).catch((error) => {
      console.log(error)
    })
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/dashboard/researcher' />
    }
  }

  componentDidMount(){
    this.fetchIPFS();
  }
  render() {
    const { data } = this.props;
    // const checkResearcher = checkIfUserIsResearcher()
    // const researchButton = (<Button bsStyle="primary">Reseach this article</Button>);

    return (
      <div>
        {this.renderRedirect()}
        <Jumbotron>
          <h1>{this.state.myData.title}</h1>
          <p><small>Status: {data[3].c[0]} | Reward: {data[2].c[0]}TRV | Hash: {data[0]}</small></p>
          <p>
            Description of the problem: <br />
            {this.state.myData.desc}
          </p>
          {this.props.curUserInfo.rank >= 2 && <Button bsStyle="warning" onClick={this.researchArticle}>Research This Article!</Button>}<Button bsStyle="primary" href={this.state.myData.url} target="_blank">Link to the article</Button>
          {(data[1].length > 0)  && <p><small> ResearcherHash: {data[1]}</small></p>}
        </Jumbotron>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowArticleInfo));
