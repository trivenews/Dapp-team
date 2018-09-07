import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
// import contract from 'truffle-contract';

import web3 from '../../web3';
import { setJSON } from '../../util/IPFS.js';
import Loader from './Loader';
// import storehash from '../../storehash';

class Verify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      transactionHash:'',
      txReceipt: '',
      loading: false,
      myData: {
        url: "",
        title: "",
        description: ""
      },
      reward: ''
    };
  }


  handleMyData = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
    const { name, value } = e.target;
    console.log(name, value, this.state);
    this.setState((prevState) => ({
      myData: {
        ...prevState.myData,
        [name]: value
      }
    }));
  }

  handleMyDataReward = (e) => {
    this.setState({ reward: e.target.value });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { url } = this.state.myData;
    this.setState({loading: true});
    //obtain contract address from storehash.js
    // const ethAddress= await TriveDapp.options.address;
    // this.setState({ethAddress});

    const hash = await setJSON({ myData: this.state.myData });

    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add

    this.setState({ ipfsHash: hash });

    // call Ethereum contract method "createTask" and send info to etheruem contract
    //return the transaction hash from the ethereum contract
    //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
    this.props.trive.triveContract.createTask(this.state.ipfsHash, url, this.state.reward * 10 ** 18, {from: this.props.account, gas: 6654755})
    .then((result) => {
      console.log(result.tx);
      this.setState({transactionHash: result.tx, loading: false})
    }).catch((error) => {
      // TODO: make an error screen if user didn't approve contract to send tokens
      this.setState({loading: false})
      console.log(error);
    })

  }; //onSubmit

  render() {
    const { title, url, description} = this.state.myData

    return (
      <div>
        {this.state.loading && <Loader />}

        <Grid className="verify-container">
          <h3> Give Article information to verify and send to IPFS </h3>
          <br />
          <Form onSubmit={this.onSubmit} >

            URL
            <br />
            <input
              type = "url"
              value={url}
              name="url"
              onChange={this.handleMyData}
              style={{width: '70%', height: '3em', marginRight: '5px'}}
                />

            <br />
            Title
            <br />
            <input
              type = "text"
              value={title}
              name="title"
              onChange={this.handleMyData}
              style={{width: '70%', height: '3em', marginRight: '5px'}}
                />

            <br />

            Description
            <br />
            <textarea
              type = "textarea"
              value={description}
              name="description"
              onChange={this.handleMyData}
              style={{width: '70%', minHeight: '6em', height: 'auto', marginRight: '5px'}}
                ></textarea>
            <br />
            Reward
            <br />
            <input
              type = "number"
              value={this.state.reward}
              onChange={this.handleMyDataReward}
              style={{width: '70%', height: '3em', marginRight: '5px'}}
                />

            <br />
            <br />
            <Button
              bsStyle="primary"
              type="submit">
              Send it
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
              {/* <tr>
                <td>Ethereum Contract Address</td>
                <td>{this.state.ethAddress}</td>
              </tr> */}

              <tr>
                <td>Tx Hash # </td>
                <td>{this.state.transactionHash}</td>
              </tr>
            </tbody>
          </Table>
        </Grid>
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

export default withRouter(connect(mapStateToProps)(Verify));
