import {Table, Grid, Button, Form, Radio, FormGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import web3 from '../../web3';
import { setJSON, getJSON } from '../../util/IPFS.js'
import storehash from '../../storehash';
import VerifierArticleInfo from "../showComponents/VerifierArticleInfo";
import Loader from './Loader';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class VerifierForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      transactionHash:'',
      txReceipt: '',
      researcherData: {
        taskID: "",
        source: "",
        comments: "",
        score: ""
      },
      hasTask: false,
      curTaskId: {
        id: '',
        loaded: false
      },
      disagree: false,
      loading: false,
      done: false
    }
    // this.checkIfResearcherHasATask = this.checkIfResearcherHasATask.bind(this);
    // this.getCurrentTask = this.getCurrentTask.bind(this);
  }

    handleMyData = (e) => {
      const { name, value } = e.target;
      this.setState((prevState) => ({
          researcherData: {
          ...prevState.researcherData,
          [name]: value
        }
      }));
    }

    onSubmit = async (event) => {
      event.preventDefault();
      this.setState({loading: true});

      const hash = await setJSON({ researcherData: this.state.researcherData });

      this.setState({ ipfsHash: hash });

      this.props.trive.triveContract.challengeResearcher(this.state.curTaskId.id, this.state.ipfsHash, {from: this.props.account, gas: 554755})
      .then((result) => {
        this.setState({transactionHash: result.tx, loading: false, done: true})
      }).catch((error) => {
        this.setState({loading: false})
        console.log(error);
      })
    }; //onSubmit

    getCurrentTask = () => {
      this.props.trive.triveContract.verifierToTask(this.props.account)
      .then((result) => {
        console.log(result.c[0]);
        this.setState({
          curTaskId: {
            id: result.c[0],
            loaded: true
          },
          researcherData: {
            taskID: result.c[0]
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    checkIfVerifierHasATask = () => {
      console.log(this.props.account)
      this.props.trive.triveContract.verifierBusy(this.props.account)
      .then((result) => {
        if (result === true) {
          this.setState({hasTask: true})
          this.getCurrentTask();
        } else {
          console.log("GET A JOB!")

        }
      }).catch((error) => {
        console.log(error)
      })
    }
    verifyResearch = (e) => {
      e.preventDefault();
      this.setState({loading: true})
      this.props.trive.triveContract._verifyTask(this.state.curTaskId.id, {from: this.props.account})
      .then((result) => {
        console.log(result)
        //// TODO: add confirmation screen
        this.setState({
          transactionHash: result.tx,
          loading: false,
          done: true
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    disagreeResearch = (e) => {
      e.preventDefault();
      console.log("I DISAGREE!!!!")
      this.setState({
        disagree: !this.state.disagree
      })
    }
    addToResearch = (e) => {
      e.preventDefault();
      console.log("I WANT TO ADD SOMETHING")
    }

    componentDidMount() {
      if (this.props.trive.isloaded){this.checkIfVerifierHasATask()};
    }

    render() {
      const { score, source, comments} = this.state.researcherData;
      const verifyButton = (<Button bsStyle="warning" onClick={this.verifyResearch}>Verify!</Button>);
      const disagreeButton = (<Button bsStyle="warning" onClick={this.disagreeResearch}>{!this.state.disagree ? 'Disagree!' : "I actually agree"}</Button>);
      const addButton = (<Button bsStyle="warning" onClick={this.addToResearch}>Add info</Button>);
      const formPage = (<Grid className="verify-container">
        <h3>Welcome Verifier, please submit a better research </h3>
        <br />

        <Form onSubmit={this.onSubmit} >

            Source
            <br />
            <textarea
              type = "text"
              value={source}
              name="source"
              onChange={this.handleMyData}
              style={{width: '100%', minHeight: '6em', height: 'auto', marginRight: '5px'}}
            ></textarea>

            <br />


            Comments
            <br />


            <textarea
              type = "textarea"
              rows = "4"
              value={comments}
              name="comments"
              onChange={this.handleMyData}
              style={{width: '100%', minHeight: '6em', height: 'auto', marginRight: '5px'}}
               ></textarea>


            <br />
            <br />
            How true is this article in percentage
            <FormGroup>
              <Radio inline value={25} name="score" onChange={this.handleMyData}>25%</Radio>
              <Radio inline value={50} name="score" onChange={this.handleMyData}>50%</Radio>
              <Radio inline value={75} name="score" onChange={this.handleMyData}>75%</Radio>
              <Radio inline value={100} name="score" onChange={this.handleMyData}>100%</Radio>
            </FormGroup>
            <br />
            <br />
            <Button
             bsStyle="primary"
             type="submit">
             Send
            </Button>

            <br />

        </Form>
        <hr />

      </Grid>);
      const research = (<VerifierArticleInfo
        articleId={this.state.curTaskId}
      />);
      const table = (<Table bordered responsive>
        <thead>
          <tr>
            <th>Tx Receipt Category</th>
            <th>Values</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Tx Hash # </td>
            <td>{this.state.transactionHash}</td>
          </tr>
        </tbody>
    </Table>);
      const findJob = (<h1>FIND A JOB TO VERIFY</h1>);

      return (
        <div >
          {this.state.loading && <Loader />}
          {this.state.hasTask && this.state.curTaskId.loaded && !this.state.done && research}
          {this.state.hasTask && !this.state.done && this.state.disagree && formPage}
          {this.state.hasTask && !this.state.done && !this.state.disagree && verifyButton}
          {this.state.hasTask && !this.state.done && !this.state.disagree && addButton}
          {this.state.hasTask && !this.state.done && disagreeButton}
          {this.state.hasTask && table}
          {!this.state.hasTask && findJob}

     </div>
      );
    } //render
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifierForm));
