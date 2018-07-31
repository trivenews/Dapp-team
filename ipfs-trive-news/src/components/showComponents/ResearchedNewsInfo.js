import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";
import contract from 'truffle-contract';
import web3 from '../../web3';
import VotingContract from '../../../build/contracts/Voting.json';

const TriveDapp = contract(VotingContract);
TriveDapp.setProvider(web3.currentProvider);

class ResearchedNewsInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: ""
      },
      researcherData: {
        source: '',
        comments: '',
        score: ""
      }
    }
    this.fetchIPFSOne = this.fetchIPFSOne.bind(this);
    this.fetchIPFSTwo = this.fetchIPFSTwo.bind(this);
    this.verifyArticle = this.verifyArticle.bind(this);
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
            url: data.myData.url
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
    console.log(this.props.articleId)
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {
      TriveDappInstance = instance;
      return TriveDappInstance._verifyTask(this.props.articleId, {from: this.props.curAddr})
    }).then((result) => {
      console.log(result)

    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.fetchIPFSOne();
    this.fetchIPFSTwo();
  }
  render() {
    const { data } = this.props;

    return (
      <div>
        <Jumbotron>
          <h1>{this.state.myData.title}</h1>
          <p><small>Status: {data[3].c[0]} | Reward: {data[2].c[0]}TRV </small></p>
          <p>
            Description of the problem: <br />
            {this.state.myData.desc}
          </p>
          <p>Source: <br /> {this.state.researcherData.source}</p>
          <p>Comments: <br /> {this.state.researcherData.comments}</p>
          <p>Score: <br /> {this.state.researcherData.score}%</p>
          <Button bsStyle="success" onClick={this.verifyArticle}>Verify</Button>
        </Jumbotron>
      </div>
    );
  }
}
export default ResearchedNewsInfo;
