import React, { Component } from "react";
import {Jumbotron} from "react-bootstrap";
// import contract from 'truffle-contract';
// import web3 from '../../web3';

// import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class VerifierArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      taskData: {
        desc: "",
        title: "",
        url: "",
        image: ''
      },
      taskInfo: {
        ipfsTaskHash: "",
        ipfsResearchHash: "",
        reward: ""
      },
      researcherData: {
        source: '',
        comments: '',
        score: ''
      }
    }
    // this.fetchIPFS = this.fetchIPFS.bind(this);
    // this.getTaskInfo = this.getTaskInfo.bind(this);
  }
  fetchTaskIPFS = () => {
    fetch(`https://gateway.ipfs.io/ipfs/${this.state.taskInfo.ipfsTaskHash}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();

      })
      .then(data => {
        this.setState({
          taskData: {
            desc: data.myData.description,
            title: data.myData.title,
            url: data.myData.url,
            image: data.myData.image
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };
  fetchResearchIPFS = () => {
    fetch(`https://gateway.ipfs.io/ipfs/${this.state.taskInfo.ipfsResearchHash}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();

      })
      .then(data => {
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

  getTaskInfo = () => {
    this.props.trive.triveContract.methods
    .tasks(this.props.articleId.id)
    .call()
    .then((result) => {
      // console.log(result)
      this.setState({
        taskInfo: {
          ipfsTaskHash: result[0],
          ipfsResearchHash: result[1],
          reward: result[2]
        }
      })
      this.fetchTaskIPFS();
      this.fetchResearchIPFS();
    }).catch((error) => {
      console.log(error)
    })
  };

  convertToTriveDeci = (num) => {
    let result = num / 10 ** 8;
    return result
  }

  componentDidMount() {
    this.getTaskInfo();
  }

  render() {

    return (
      <div>
        <Jumbotron>
          <h1>{this.state.taskData.title}</h1>
          <img src={this.state.taskData.image} className='showImage' alt=""/>

          <p><small>Reward: {this.convertToTriveDeci(this.state.taskInfo.reward)}TRV</small></p>
          <p>
            Description of the problem: <br />
            {this.state.taskData.desc}
          </p>
          <p>Source: <br /> {this.state.researcherData.source}</p>
          <p>Comments: <br /> {this.state.researcherData.comments}</p>
          <p>Score: <br /> {this.state.researcherData.score}%</p>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return ({
    curUserInfo: state.currentUserInfo.curUserInfo,
    account: state.trive.account,
    trive: state.trive.contracts
  //activeAccount: state.web3.activeAccount
})
};
export default withRouter(connect(mapStateToProps)(VerifierArticleInfo));
