import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../../web3';
import VotingContract from '../../../build/contracts/Voting.json';
import { Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Loader from "../D-Components/Loader";


class ShowArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: "",
        image: ''
      },
      isresearcher: false,
      redirect: false,
      zoomInActive: false,
      loading: false
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
            url: data.myData.url,
            image: data.myData.image
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };

  researchArticle(e) {
    e.preventDefault();
    console.log('CLICK!')
    this.setState({loading: true})
    this.props.trive.triveContract._acceptTask(this.props.articleId, {from: this.props.account})
    .then((result) => {
      console.log(result)
      this.setState({
        loading: false,
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

  zoomInFunc = () => {
    this.setState({zoomInActive: !this.state.zoomInActive})
  }

  componentDidMount(){
    this.fetchIPFS();
  }
  render() {
    const { data } = this.props;
    // const checkResearcher = checkIfUserIsResearcher()
    // const researchButton = (<Button bsStyle="primary">Reseach this article</Button>);
    const style = {
      'text-align': 'left',
      'border-bottom': '0.5px solid #fff'
    }
    const zoomIn = (<Jumbotron onClick={this.zoomInFunc}>
      <h1>{this.state.myData.title}</h1>
      <img src={this.state.myData.image} className='showImage' alt=""/>
      <p><small>Status: {data[3].c[0]} | Reward: {web3.utils.toBN(data[2].c[0]).toString()}TRV | Hash: {data[0]}</small></p>
      <p>
        Description of the problem: <br />
        {this.state.myData.desc}
      </p>
      {this.props.curUserInfo.rank >= 2 && <Button bsStyle="warning" onClick={this.researchArticle}>Research This Article!</Button>}<Button bsStyle="primary" href={this.state.myData.url} target="_blank">Link to the article</Button>
      {(data[1].length > 0)  && <p><small> ResearcherHash: {data[1]}</small></p>}
    </Jumbotron>);
    const listItem = (<Media style={style} className='article-intro' onClick={this.zoomInFunc}>
      <Media.Left>
        <img width={64} height={64} src={this.state.myData.image} alt="thumbnail" />
      </Media.Left>
      <Media.Body>
        <Media.Heading>{this.state.myData.title}</Media.Heading>
        <p>
          Description of the problem: <br />
          {this.state.myData.desc}
        </p>
      </Media.Body>
    </Media>)
    return (
      <div >
        {this.renderRedirect()}
        {this.state.zoomInActive && zoomIn}
        {!this.state.zoomInActive && listItem}
        {this.state.loading && <Loader />}

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
