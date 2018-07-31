import {Table, Grid, Button, Form, Radio, FormGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import web3 from '../../web3';
import { setJSON, getJSON } from '../../util/IPFS.js'
import storehash from '../../storehash';
import ResearcherArticleInfo from "../showComponents/researcherArticleInfo";

class ResearcherForm extends Component {
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
      curTaskId: ""
    }
    this.checkIfResearcherHasATask = this.checkIfResearcherHasATask.bind(this);
    this.getCurrentTask = this.getCurrentTask.bind(this);
  }
   //handle capture file event if we want to add a file upload to the page

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };

      handleMyData = (e) => {
      const { name, value } = e.target;
      this.setState((prevState) => ({
          researcherData: {
          ...prevState.researcherData,
          [name]: value
        }
      }));
    }


    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };



    onSubmit = async (event) => {
      event.preventDefault();
      this.setState({loading: true});
      const TriveDapp = this.props.myContract;
      this.setState({ethAddress: TriveDapp});
      var TriveDappInstance;
      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);
      //obtain contract address from storehash.js
      // const ethAddress= await storehash.options.address;
      // this.setState({ethAddress});

      const hash = await setJSON({ researcherData: this.state.researcherData });
      console.log('this is my hash', hash);

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add

        this.setState({ ipfsHash: hash });

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

        TriveDapp.deployed().then((instance) => {
          TriveDappInstance = instance;
          return TriveDappInstance._submitTask(this.state.curTaskId, this.state.ipfsHash, this.state.researcherData.score, {from: accounts[0], gas: 554755})
        }).then((result) => {
          console.log(result.tx);
          this.setState({transactionHash: result.tx, loading: false})
        }).catch((error) => {
          this.setState({loading: false})
          console.log(error);
        })
    }; //onSubmit

    getCurrentTask() {
      const TriveDapp = this.props.myContract;
      var TriveDappInstance;
      TriveDapp.deployed().then((instance) => {
        TriveDappInstance = instance;
        return TriveDappInstance.researcherToTask(this.props.curAddr)
      }).then((result) => {
        // console.log(result.c[0]);
        this.setState({
          curTaskId: result.c[0],
          researcherData: {
            taskID: result.c[0]
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    checkIfResearcherHasATask() {
      const TriveDapp = this.props.myContract;
      var TriveDappInstance;
      TriveDapp.deployed().then((instance) => {
        TriveDappInstance = instance;
        return TriveDappInstance.researcherBusy(this.props.curAddr)
      }).then((result) => {
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

    componentDidMount() {
      this.checkIfResearcherHasATask();
    }

    render() {
      const { score, source, comments} = this.state.researcherData
      const formPage = (<Grid className="verify-container">
        <h3>Welcome Researcher, please submit your story facts for review </h3>
        <br />
        <ResearcherArticleInfo
          articleId={this.state.curTaskId}
          myContract={this.props.myContract}
          score={this.state.score}
          researcherData={this.state.researcherData}
        />
        <Form onSubmit={this.onSubmit} >


          {/* <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Textarea</ControlLabel>
            <FormControl componentClass="textarea" placeholder="textarea" />
          </FormGroup> */}

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
            <Button
             bsStyle="primary"
             type="submit">
             Send your documents for review
            </Button>

            <br />

        </Form>

        <hr/>

            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Tx Receipt Category</th>
                  <th>Values</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>IPFS Hash # stored on Eth Contract</td>
                  <td>{this.state.ipfsHash}</td>
                </tr>
                <tr>
                  <td>Ethereum Contract Address</td>
                  <td>{this.state.ethAddress}</td>
                </tr>

                <tr>
                  <td>Tx Hash # </td>
                  <td>{this.state.transactionHash}</td>
                </tr>
              </tbody>
          </Table>
      </Grid>);
      const findJob = (<h1>FIND A JOB</h1>);

      return (
        <div >

          {this.state.hasTask && formPage}
          {!this.state.hasTask && findJob}

     </div>
      );
    } //render
}

export default ResearcherForm;
