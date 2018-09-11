import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../../web3';
import VotingContract from '../../../build/contracts/Voting.json';
import { Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class ResearchedNewsInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: "",
        image: '',
      },
      researcherData: {
        source: '',
        comments: '',
        score: ""
      },
      redirect: false
    }
    this.fetchIPFSOne = this.fetchIPFSOne.bind(this);
    this.fetchIPFSTwo = this.fetchIPFSTwo.bind(this);
    this.verifyArticle = this.verifyArticle.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);

  }
  fetchIPFSOne() {
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
            url: data.myData.url,
            image: data.myData.image
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };
  fetchIPFSTwo() {
    fetch(`https://gateway.ipfs.io/ipfs/${this.props.data[1]}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();
      })
      .then(data => {
        // console.log(data.researcherData)
        this.setState({
          researcherData: {
            source: data.researcherData.source,
            comments: data.researcherData.comments,
            score: data.researcherData.score
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };


  verifyArticle(e) {
    e.preventDefault();
    this.props.trive.triveContract._acceptVerifyTask(this.props.articleId, {from: this.props.account})
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
      return <Redirect to='/dashboard/verifier' />
    }
  }
  convertToTriveDeci = (num) => {
    let result = num.toString()
    let len = result.length;
    let res = result.substring(0, len-4) + "." + result.substring(len-2);
    console.log('hi')
    return res
  }

  componentDidMount(){
    this.fetchIPFSOne();
    this.fetchIPFSTwo();
  }
  render() {
    const { data } = this.props;

    return (
      <div>
        {this.renderRedirect()}
        <Jumbotron>
          <h1>{this.state.myData.title}</h1>
          <img src={`data:image/jpeg;base64,${this.state.myData.image}`} className='showImage' alt=""/>
          <p><small>Status: {data[3].c[0]} | Reward: {this.convertToTriveDeci(data[2].c[0])}TRV </small></p>
          <p>
            Description of the problem: <br />
            {this.state.myData.desc}
          </p>
          <p>Source: <br /> {this.state.researcherData.source}</p>
          <p>Comments: <br /> {this.state.researcherData.comments}</p>
          <p>Score: <br /> {this.state.researcherData.score}%</p>
          {(data[3].c[0] === 2) && this.props.curUserInfo.rank >= 3 && <Button bsStyle="success" onClick={this.verifyArticle}>Accept verify</Button>}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResearchedNewsInfo));
